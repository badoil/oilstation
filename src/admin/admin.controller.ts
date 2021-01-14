import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Render,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateShopDto } from './dto/create.shop.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  createAdmin(@Body() adminData) {
    return this.adminService.createAdmin(adminData);
  }

  @Post('shop')
  createShop(@Body() shopData: CreateShopDto) {
    return this.adminService.createShop(shopData);
  }

  @Get('shop')
  getShop() {
    return this.adminService.getShop();
  }

  @Put('shop')
  updateShop(@Body() bodyData) {
    return this.adminService.updateShop(bodyData);
  }
}
