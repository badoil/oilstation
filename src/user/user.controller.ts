import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Render,
} from '@nestjs/common';
import { CreateUserDto } from './create.user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('login')
  @Render('login')
  getLoginForm() {
    return {};
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
