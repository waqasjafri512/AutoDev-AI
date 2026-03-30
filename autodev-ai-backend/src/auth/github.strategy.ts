import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID') as string,
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') as string,
      callbackURL: `${configService.get<string>('BACKEND_URL')}/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { emails, displayName, username } = profile;
    const user = {
      email: emails[0].value,
      name: displayName || username,
      accessToken,
    };
    done(null, user);
  }
}
