import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { Response } from 'express';
import { SearchShopDto } from '../admin/dto/search.shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('/insert')
  @Render('shop/insert')
  getInsert() {
    return {};
  }

  // @Get('/list')
  // @Render('web/admin/shop/list')
  // async getList(@Query('keyword') keyword: SearchShopDto) {
  //   const shopList = await this.shopService.getUser(keyword);
  //   console.log('shoplist contorller: ', shopList);
  //   return {
  //     query: query,
  //     shopList: shopList,
  //   };
  // }

  @Get('user')
  @Render('web/shop/user/shop')
  getUsers(@Query('searchText') searchText: string) {
    console.log('searchText:', searchText);
    return this.shopService.getUser(searchText);
  }

  @Post()
  createUser(@Body() bodyData) {
    return this.shopService.createUser(bodyData);
  }

  @Get()
  getUser(@Query('phoneNumber') phoneNumber: string) {
    return this.shopService.getUser(phoneNumber);
  }

  @Put()
  updateUser(@Body() bodyData, @Res() res: Response) {
    return this.shopService.updateUser(bodyData, res);
  }

  @Delete()
  deleteUser(@Query('phoneNumber') phoneNumber: string, @Res() res: Response) {
    return this.shopService.deleteUser(phoneNumber, res);
  }
}
