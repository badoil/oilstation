import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Render,
  Res,
  Req,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginGuard } from 'src/common/guards/login.guard';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { AuthExceptionFilter } from 'src/common/filter/auth-exceptions.filter';

@UseFilters(AuthExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Get('auth')
  @Render('login')
  getLoginForm(@Req() req) {
    return {
      user: req.user,
      message: req.flash('loginError'),
    };
  }

  @UseGuards(LoginGuard)
  @Post('auth/login')
  login(@Res() res: Response) {
    res.redirect('/');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test')
  getUserPage(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    req.flash('loginError', '로그아웃 되었습니다.');
    res.redirect('/user/auth');
  }
}
