import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { AuthExceptionFilter } from './common/filter/auth-exceptions.filter';
import { LoginGuard } from './common/guards/login.guard';
import { RolesGuard } from './common/guards/roles.guard';

@UseFilters(AuthExceptionFilter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(@Req() req) {
    return {
      message: req.flash('auth'),
      user: req.user,
    };
  }

  @Get('auth')
  @Render('web/login')
  auth(@Req() req) {
    return {
      user: req.user,
      message: req.flash('auth'),
    };
  }
  @UseGuards(LoginGuard)
  @Post('auth/login')
  login(@Res() res: Response) {
    res.redirect('/');
  }

  @Post('currentSize')
  getSize(@Body() data) {
    console.log(data);
  }
}
