import { Controller, Get, Query, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(@Req() req) {
    return {
      message: '오일 스테이션 서버 입니다.',
      user: req.user,
    };
  }
}
