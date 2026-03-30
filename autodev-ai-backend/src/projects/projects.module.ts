import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectListener } from './projects.listener';
import { ProjectGateway } from './project.gateway';
import { GitHubService } from './github.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [ProjectsService, ProjectListener, ProjectGateway, GitHubService],
  controllers: [ProjectsController],
  exports: [ProjectsService, ProjectGateway, GitHubService],
})
export class ProjectsModule {}
