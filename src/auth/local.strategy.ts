import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    console.log(request.body);
    const role = request.body.role;
    const user = await this.authService.validateUser(username, password, role);
    if (!user) {
      throw new UnauthorizedException(
        'CHECK_ID_PASSWORD',
        '일치하는 정보 없음',
      );
    }
    return user;
  }
}
