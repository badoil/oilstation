import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { type } from 'os';
import { env } from 'process';
import { ExceptionCode } from '../exception.code';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const code = exception.getResponse();
    let msg = '';

    if (typeof code == 'string') {
      msg = ExceptionCode[code];

      return response.status(status).json({
        success: false,
        code,
        msg,
      });
    }

    if (typeof code == 'object') {
      return response.status(status).json(code);
    }
  }
}
