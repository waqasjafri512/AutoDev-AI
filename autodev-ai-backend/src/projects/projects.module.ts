import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectListener } from './projects.listener';
import { ProjectGateway } from './project.gateway';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [ProjectsService, ProjectListener, ProjectGateway],
  controllers: [ProjectsController],
  exports: [ProjectsService, ProjectGateway],
})
export class ProjectsModule {}
