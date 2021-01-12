import { Controller, Get, Query, Render } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: '오일 스테이션 서버 입니다.' };
  }

  @Get('login')
  @Render('login')
  login() {
    return {};
  }

  @Get('auth')
  auth(@Query() login) {
    return this.appService.auth(login);
  }
}
