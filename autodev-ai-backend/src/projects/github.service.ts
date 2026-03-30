import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class GitHubService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly token: string;

  constructor(private configService: ConfigService) {
    this.token = this.configService.get<string>('GITHUB_TOKEN') || '';
  }

  private get headers() {
    const h: any = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'AutoDev-AI-Platform',
    };
    if (this.token) {
      h.Authorization = `token ${this.token}`;
    }
    return h;
  }

  isGithubUrl(url: string): boolean {
    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    return regex.test(url);
  }

  parseUrl(url: string): { owner: string; repo: string } {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return { owner: '', repo: '' };
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, ''),
    };
  }

  async getRepoContext(url: string): Promise<string> {
    const parsed = this.parseUrl(url);
    if (!parsed.owner) return '';

    const { owner, repo } = parsed;

    try {
      // 1. Get default branch
      const repoInfo = await axios.get(
        `${this.baseUrl}/repos/${owner}/${repo}`,
        {
          headers: this.headers,
        },
      );
      const defaultBranch = repoInfo.data.default_branch;

      // 2. Get file tree
      const treeResponse = await axios.get(
        `${this.baseUrl}/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
        { headers: this.headers },
      );

      const tree = treeResponse.data.tree;
      const filePaths = tree
        .filter((item: any) => item.type === 'blob')
        .map((item: any) => item.path);

      // 3. Identify key files
      const keyFiles = this.filterKeyFiles(filePaths);

      // 4. Fetch content of key files
      const fileContents = await Promise.all(
        keyFiles.map(async (path) => {
          try {
            const contentResponse = await axios.get(
              `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${path}`,
              { headers: { 'User-Agent': 'AutoDev-AI-Platform' } },
            );
            return `--- FILE: ${path} ---\n${contentResponse.data.toString().substring(0, 3000)}`;
          } catch (e) {
            return `--- FILE: ${path} (Error fetching content) ---`;
          }
        }),
      );

      return `
REPOSITORY: ${owner}/${repo}
STRUCTURE:
${filePaths.slice(0, 50).join('\n')}
${filePaths.length > 50 ? '... and ' + (filePaths.length - 50) + ' more files' : ''}

KEY FILE CONTENTS:
${fileContents.join('\n\n')}
      `.trim();
    } catch (error) {
      console.error('Error fetching GitHub context:', error.message);
      return `Error fetching GitHub context for ${owner}/${repo}: ${error.message}`;
    }
  }

  private filterKeyFiles(paths: string[]): string[] {
    const priorityFiles = [
      'package.json',
      'tsconfig.json',
      'docker-compose.yml',
      'Dockerfile',
      'index.js',
      'index.ts',
      'src/main.ts',
      'src/app.module.ts',
      'main.py',
      'requirements.txt',
      'go.mod',
      'Cargo.toml',
    ];

    const foundPriority = paths.filter((p) => priorityFiles.includes(p));

    // Also include some controllers/routes if found to give more context (limit to 3)
    const extraFiles = paths
      .filter(
        (p) =>
          p.includes('controller') ||
          p.includes('route') ||
          p.includes('schema'),
      )
      .slice(0, 3);

    return [...new Set([...foundPriority, ...extraFiles])].slice(0, 8); // Max 8 files for context
  }
}
