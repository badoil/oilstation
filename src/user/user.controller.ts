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
import { AuthExceptionFilter } from 'src/common/filter/auth-exceptions.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@UseFilters(AuthExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Get('auth')
  @Render('web/front/login')
  getLoginForm(@Req() req) {
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

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('oil')
  @Render('web/front/oil')
  getOil(@Req() req) {
    return { user: req.user };
  }

  @UseGuards(RolesGuard)
  @Get('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    req.flash('auth', '로그아웃 되었습니다.');
    res.redirect('/');
  }
}
