import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req: any, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(req.user.userId || req.user.sub, dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Request() req: any) {
    return this.projectsService.findAll(req.user.userId || req.user.sub);
  }

  @Get('public/:id')
  async findPublic(@Param('id') id: string) {
    return this.projectsService.findOnePublic(id);
  }

  @Patch(':id/public')
  @UseGuards(AuthGuard('jwt'))
  async toggleVisibility(
    @Request() req: any,
    @Param('id') id: string,
    @Body('isPublic') isPublic: boolean,
  ) {
    return this.projectsService.toggleVisibility(
      id,
      req.user.userId || req.user.sub,
      isPublic,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.projectsService.findOne(id, req.user.userId || req.user.sub);
  }
}
