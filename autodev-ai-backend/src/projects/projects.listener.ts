import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectGateway } from './project.gateway';
import { GitHubService } from './github.service';

@Injectable()
export class ProjectListener {
  constructor(
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
    private readonly projectGateway: ProjectGateway,
    private readonly githubService: GitHubService,
  ) {}

  @OnEvent('project.created', { async: true })
  async handleProjectCreated(payload: {
    projectId: string;
    input: string;
    userId: string;
  }) {
    const { projectId, input, userId } = payload;

    try {
      await (this.prisma.project as any).update({
        where: { id: projectId },
        data: { status: 'PROCESSING' },
      });
      this.projectGateway.sendProjectUpdate(userId, {
        projectId,
        status: 'PROCESSING',
      });

      let context = '';
      if (this.githubService.isGithubUrl(input)) {
        console.log(`GitHub URL detected: ${input}. Exploring repository...`);
        context = await this.githubService.getRepoContext(input);
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      const isPro = (user as any)?.isPro || false;

      const assets = await this.aiService.generateAll(input, context, isPro);

      await (this.prisma.project as any).update({
        where: { id: projectId },
        data: {
          readme: assets.readme,
          apiDocs: assets.api_docs,
          dbSchema: assets.db_schema,
          deploymentGuide: assets.deployment_guide,
          landingPage: assets.landing_page,
          folderStructure: assets.folder_structure,
          envTemplate: assets.env_template,
          postmanCollection: assets.postman_collection,
          status: 'COMPLETED',
        },
      });
      this.projectGateway.sendProjectUpdate(userId, {
        projectId,
        status: 'COMPLETED',
      });
    } catch (error) {
      console.error('AI Generation Failed:', error);
      await (this.prisma.project as any).update({
        where: { id: projectId },
        data: {
          status: 'FAILED',
          error: error.message,
        },
      });
      this.projectGateway.sendProjectUpdate(userId, {
        projectId,
        status: 'FAILED',
      });
    }
  }
}
