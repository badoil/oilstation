import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create.admin.dto';
import { CreateShopDto } from './dto/create.shop.dto';
import { SearchShopDto } from './dto/search.shop.dto';
import { ShopService } from '../shop/shop.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AuthExceptionFilter } from 'src/common/filter/auth-exceptions.filter';

@Controller('admin')
@UseFilters(AuthExceptionFilter)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly shopService: ShopService,
  ) {}

  @Get('/shop/list')
  @Roles('admin')
  @Render('web/admin/shop/list')
  async getList(@Query() query: SearchShopDto) {
    const shopList = await this.adminService.getShop(query);
    console.log('shoplist contorller > ', shopList);
    return {
      query: query,
      shopList: shopList,
    };
  }

  @Get('/shop/view')
  @Roles('admin')
  @Render('web/admin/shop/view')
  async getView(@Query() query: SearchShopDto) {
    return { query: query };
  }

  @Get('/shop/duplicate')
  async duplicateCheck(@Query('shopName') shopName: string) {
    console.log(shopName);
    const shopList = this.adminService.findByShopName(shopName);
    console.log(shopList);
    return shopList;
  }

  @Post('/shop/save')
  createShop(@Body() shopData: CreateShopDto, @Req() req) {
    return this.adminService.createShop(shopData, req.user.ID);
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

  /*@Get('shop')
	getShop(@Query('searchText') searchText: string) {
	  return this.adminService.getShop(searchText);
	}*/

  @Put('shop')
  updateShop(@Body() bodyData) {
    return this.adminService.updateShop(bodyData);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/shop/registerShop')
  @Render('web/admin/user/registerShop')
  registerShopRender() {
    return {};
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/shop/registerShop/duplicate')
  async duplicate(@Query('name') name: string) {
    const shop = await this.shopService.findOne(name);

    return shop ? false : true;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('/shop/registerShop')
  async registerShop(@Body() shopData: CreateShopDto, @Req() req) {
    console.log(shopData);
    const data = await this.adminService.createShop(shopData, req.user.ID);

    return data ? true : false;
  }
}
