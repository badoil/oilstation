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
import { CreateAdminDto } from './dto/create.admin.dto';
import { CreateShopDto } from './dto/create.shop.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('list')
  @Render('web/admin/shop/shop')
  getShops(){
    return
  } 

  @Post('signup')
  createAdmin(@Body() adminData: CreateAdminDto) {
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
