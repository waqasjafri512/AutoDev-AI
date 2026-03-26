import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(userId: string, dto: CreateProjectDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (!(user as any).isPro) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastDate = (user as any).lastUsageDate ? new Date((user as any).lastUsageDate) : null;
      if (lastDate) lastDate.setHours(0, 0, 0, 0);
      let usageCount = (user as any).usageCount || 0;
      if (!lastDate || lastDate.getTime() < today.getTime()) {
        usageCount = 0;
      }
      if (usageCount >= 3) {
        throw new Error('Daily generation limit reached (3 per day). Upgrade for more.');
      }
      await (this.prisma.user as any).update({
        where: { id: userId },
        data: {
          usageCount: usageCount + 1,
          lastUsageDate: new Date(),
        },
      });
    }

    const project = await (this.prisma.project as any).create({
      data: {
        ...dto,
        userId,
        status: 'PENDING',
      },
    });

    this.eventEmitter.emit('project.created', {
      projectId: project.id,
      input: project.input,
      userId,
    });

    return project;
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.project.findFirst({
      where: { id, userId },
    });
  }

  async findOnePublic(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project || !(project as any).isPublic) {
      throw new Error('Project not found or not public');
    }
    return project;
  }

  async toggleVisibility(id: string, userId: string, isPublic: boolean) {
    const project = await this.prisma.project.findFirst({
      where: { id, userId },
    });
    if (!project) throw new Error('Project not found');

    return (this.prisma.project as any).update({
      where: { id },
      data: { isPublic },
    });
  }
}
