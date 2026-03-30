import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey:
        this.configService.get<string>('GROK_API_KEY') ||
        this.configService.get<string>('OPENAI_API_KEY'),
      baseURL:
        this.configService.get<string>('AI_BASE_URL') || 'https://api.x.ai/v1',
    });
  }

  async generateAsset(
    type: string,
    input: string,
    context?: string,
  ): Promise<string> {
    const prompt = this.getPrompt(type, input, context);
    const response = await this.openai.chat.completions.create({
      model: this.configService.get<string>('AI_MODEL') || 'grok-2',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert software developer and architect. Your task is to analyze the provided input and code context to generate high-quality project documentation or assets.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || '';
  }

  private getPrompt(type: string, input: string, context?: string): string {
    const contextInfo = context
      ? `\n\nCODE CONTEXT (from actual repository):\n${context}`
      : `\n\nINPUT: ${input}`;

    switch (type) {
      case 'README':
        return `Generate a professional, comprehensive README.md for a project. ${context ? 'Analyze the provided code context to list real features, dependencies, and setup steps.' : `Base it on this input: ${input}`}${contextInfo}. Include sections for Features, Installation, Usage, and License.`;
      case 'API_DOCS':
        return `Generate detailed API documentation for this project. ${context ? 'Identify the actual endpoints, methods, and data structures from the code context.' : `Base it on this input: ${input}`}${contextInfo}. List endpoints, request/response formats, and authentication.`;
      case 'DB_SCHEMA':
        return `Suggest a SQL database schema (PostgreSQL) for this project. ${context ? 'Look for models or database calls in the code context.' : `Base it on this input: ${input}`}${contextInfo}. Use standard naming conventions and include basic tables and relations.`;
      case 'DEPLOYMENT_GUIDE':
        return `Create a step-by-step deployment guide (Docker/Vercel/Heroku) for this project. ${context ? 'Consider the project structure and dependencies provided.' : `Base it on this input: ${input}`}${contextInfo}.`;
      case 'LANDING_PAGE':
        return `Generate a simple HTML/Tailwind CSS structure for a landing page. ${context ? 'Highlight the actual features found in the code.' : `Base it on this project: ${input}`}${contextInfo}. Focus on value propositions and CTAs.`;
      case 'FOLDER_STRUCTURE':
        return `Provide an optimized folder structure for this project. ${context ? 'Refine the existing structure provided in the context.' : `Base it on this project: ${input}`}${contextInfo}. List directories and key files in a clean tree format.`;
      case 'ENV_TEMPLATE':
        return `Generate a .env template with necessary environment variables. ${context ? 'Detect required secrets and config from the code context.' : `Base it on this project: ${input}`}${contextInfo}.`;
      case 'POSTMAN_COLLECTION':
        return `Generate a sample JSON for a Postman collection. ${context ? 'Include the actual endpoints discovered in the code.' : `Base it on this project: ${input}`}${contextInfo}.`;
      default:
        return `Analyze this project:\n${contextInfo}`;
    }
  }

  async generateAll(input: string, context?: string, isPro: boolean = false) {
    const FREE_ASSETS = ['README', 'LANDING_PAGE'];
    const PRO_ASSETS = [
      'API_DOCS',
      'DB_SCHEMA',
      'DEPLOYMENT_GUIDE',
      'FOLDER_STRUCTURE',
      'ENV_TEMPLATE',
      'POSTMAN_COLLECTION',
    ];
    
    const results: any = {};
    
    for (const asset of FREE_ASSETS) {
      results[asset.toLowerCase()] = await this.generateAsset(
        asset,
        input,
        context,
      );
    }

    for (const asset of PRO_ASSETS) {
      if (isPro) {
        results[asset.toLowerCase()] = await this.generateAsset(
          asset,
          input,
          context,
        );
      } else {
        results[asset.toLowerCase()] = `# Premium Feature 🚀\n\n> [!IMPORTANT]\n> This feature is exclusively available on the **AutoDev Pro Plan**.\n\nUnlock unlimited AI-generated infrastructure including **API Documentation, Folder Structures, Custom .env files, Database Schemas, Postman Collections, and more**.\n\n[Upgrade to Pro](/dashboard/pricing) to unlock this module and streamline your entire dev workflow.`;
      }
    }

    return results;
  }
}
