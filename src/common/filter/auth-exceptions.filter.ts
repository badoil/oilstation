import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const code = exception.getResponse();

    if (
      !(exception instanceof UnauthorizedException) &&
      !(exception instanceof ForbiddenException)
    ) {
      return response.redirect('/error');
    }
    if (exception.message === 'NOT_LOGIN') {
      request.flash('auth', '로그인을 해주세요.');
      return response.redirect('/user/auth');
    }

    if (exception.message === 'NO_AUTH') {
      request.flash('auth', '권한이 없습니다.');
      return response.redirect('back');
    }
    if (exception.message === 'CHECK_ID_PASSWORD') {
      request.flash(
        'auth',
        '아이디 또는 비밀번호를 확인 후 다시 입력해 주세요.',
      );
      return response.redirect('back');
    }

    request.flash('auth', '로그인 오류');
    return response.redirect('back');
  }
}
