import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('GROK_API_KEY') || this.configService.get<string>('OPENAI_API_KEY'),
      baseURL: this.configService.get<string>('AI_BASE_URL') || 'https://api.x.ai/v1',
    });
  }

  async generateAsset(type: string, input: string): Promise<string> {
    const prompt = this.getPrompt(type, input);
    const response = await this.openai.chat.completions.create({
      model: this.configService.get<string>('AI_MODEL') || 'grok-2',
      messages: [
        { role: 'system', content: 'You are an expert software developer and architect.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || '';
  }

  private getPrompt(type: string, input: string): string {
    switch (type) {
      case 'README':
        return `Generate a professional, comprehensive README.md for a project based on this input: ${input}. Include sections for Features, Installation, Usage, and License.`;
      case 'API_DOCS':
        return `Generate detailed API documentation (in Markdown or Swagger YAML) for a project based on this input: ${input}. List endpoints, request/response formats, and authentication.`;
      case 'DB_SCHEMA':
        return `Suggest a SQL database schema (PostgreSQL) for a project based on this input: ${input}. Use standard naming conventions and include basic tables and relations.`;
      case 'DEPLOYMENT_GUIDE':
        return `Create a step-by-step deployment guide (Docker/Vercel/Heroku) for a project based on this input: ${input}.`;
      case 'LANDING_PAGE':
        return `Generate a simple HTML/Tailwind CSS structure for a landing page of this project: ${input}. Focus on value propositions and CTAs.`;
      case 'FOLDER_STRUCTURE':
        return `Provide an optimized folder structure for this project: ${input}. List directories and key files in a clean tree format.`;
      case 'ENV_TEMPLATE':
        return `Generate a .env template with necessary environment variables (placeholders) for this project: ${input}.`;
      case 'POSTMAN_COLLECTION':
        return `Generate a sample JSON for a Postman collection covering the main endpoints for this project: ${input}.`;
      default:
        return `Explain this project idea or process code snippets: ${input}`;
    }
  }

  async generateAll(input: string) {
    const assets = ['README', 'API_DOCS', 'DB_SCHEMA', 'DEPLOYMENT_GUIDE', 'LANDING_PAGE', 'FOLDER_STRUCTURE', 'ENV_TEMPLATE', 'POSTMAN_COLLECTION'];
    const results: any = {};
    for (const asset of assets) {
      results[asset.toLowerCase()] = await this.generateAsset(asset, input);
    }
    return results;
  }
}
