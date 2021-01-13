import { Body, Controller, Post, Query, Get, Render } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  createAdmin(@Body() adminData) {
    return this.adminService.createAdmin(adminData);
  }

  @Post('shop')
  createShop(@Body() shopData) {}

  @Get()
  @Render('user')
  getAdmin() {
    return {};
  }
}
