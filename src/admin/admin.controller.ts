import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/shop/list')
  @Render('web/admin/shop/list')
  async getList(@Query() query: SearchShopDto) {
    console.log('query.page', query.page);
    if (query.page == null) {
      query.page = 1;
    }
    query.pageSize = 10;
    console.log('query', query);
    const shopList = await this.adminService.getShop(query);
    return {
      query: query,
      result: shopList,
    };
  }

  // TODO [yth] 테스트용 -- 추후 삭제
  @Get('/shop/view')
  @Roles('admin')
  @Render('web/admin/shop/view')
  async getView(@Query() query: SearchShopDto) {
    return { query: query };
  }

  // TODO [yth] 테스트용 -- 추후 삭제
  @Get('/shop/duplicate')
  async duplicateCheck(@Query('shopName') shopName: string) {
    console.log(shopName);
    const shopList = this.adminService.findByShopName(shopName);
    console.log(shopList);
    return shopList;
  }

  // TODO [yth] 테스트용 -- 추후 삭제
  @Post('/shop/save')
  @Roles('admin')
  createShop(@Body() shopData: CreateShopDto, @Req() req) {
    const data = this.adminService.createShop(shopData, req.user.ID);
    return data == null ? false : true;
  }

  /*@Get('list')
  @Render('web/admin/shop/shop')
  getShops(@Query('searchText') searchText: string) {
    console.log('searchText:', searchText);
    return this.adminService.getShop(searchText);
  }*/

  @Post('signup')
  createAdmin(@Body() adminData: CreateAdminDto) {
    return this.adminService.createAdmin(adminData);
  }

  /*@Get('shop')
	getShop(@Query('searchText') searchText: string) {
	  return this.adminService.getShop(searchText);
	}*/

  /*  @Put('shop')
  updateShop(@Body() bodyData) {
    return this.adminService.updateShop(bodyData);
  }*/

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/shop/registerShop')
  @Render('web/admin/shop/registerShop')
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
    return data;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('/shop/delete/:shopKey')
  async delete(@Param('shopKey') shopKey: Number, @Req() req) {
    console.log('shopKey > ', shopKey);
    return await this.adminService.deleteShop(shopKey);
  }
}
