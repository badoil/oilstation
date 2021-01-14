import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExceptionCode } from 'src/common/exception.code';
import { matchRoles } from '../matchRoles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // 로그인이 안되었을 때
    if (!request.isAuthenticated()) {
      throw new UnauthorizedException('NOT_LOGIN', '로그인이 안됨');
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const user = request.user;

    if (matchRoles(roles, user.role)) {
      return true;
    } else {
      // 권한이 없을 때
      throw new UnauthorizedException('NO_AUTH', '권한 없음');
    }
  }
}
