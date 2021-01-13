import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  Render,
  UseGuards,
} from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

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
  getLoginForm() {
    return {};
  }

  @Get('auth')
  auth(@Query() login) {
    return this.appService.auth(login);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
