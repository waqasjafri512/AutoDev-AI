import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hash },
    });
    const token = this.jwtService.sign({ userId: user.id });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ userId: user.id });
    return { user, token };
  }

  async validateGithubUser(githubUser: any) {
    let user = await this.prisma.user.findUnique({
      where: { email: githubUser.email },
    });

    if (!user) {
      user = await (this.prisma.user as any).create({
        data: {
          email: githubUser.email,
          password: null,
        },
      });
    }

    const token = this.jwtService.sign({ userId: user!.id });
    return { token, user };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async updateProfile(userId: string, data: { name?: string; bio?: string }) {
    return (this.prisma.user as any).update({
      where: { id: userId },
      data,
    });
  }
}
