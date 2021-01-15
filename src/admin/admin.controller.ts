import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Render,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create.admin.dto';
import { CreateShopDto } from './dto/create.shop.dto';
import { SearchShopDto } from './dto/search.shop.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/list')
  @Render('web/shop/list')
  async getList(@Query() query: SearchShopDto) {
    const shopList = await this.adminService.getShop(query);
    console.log('shoplist contorller > ', shopList);
    return {
      query: query,
      shopList: shopList,
    };
  }

  @Get('/view')
  @Render('web/shop/view')
  async getView(@Query() query: SearchShopDto) {
    return { query: query };
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
  getShop(@Query('searchText') searchText: string) {
    return this.adminService.getShop(searchText);
  }

  @Put('shop')
  updateShop(@Body() bodyData) {
    return this.adminService.updateShop(bodyData);
  }
}
