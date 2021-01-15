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
import { ShopService } from '../shop/shop.service';
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly shopService: ShopService,
  ) {}

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

  @Get('list')
  @Render('web/admin/shop/shop')
  getShops(@Query('searchText') searchText: string) {
    console.log('searchText:', searchText);
    return this.adminService.getShop(searchText);
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

  @Get('registerShop')
  @Render('web/admin/user/registerShop')
  registerShop() {
    return {};
  }

  @Get('registerShop/duplicate')
  async duplicate(@Query('name') name: string) {
    const shop = await this.shopService.findOne(name);

    return shop ? false : true;
  }
}
