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
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { Response } from 'express';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { SearchShopDto } from '../admin/dto/search.shop.dto';
import { CreateUserDto } from './dto/create.user.dto';

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

  @Get('user/list')
  @Render('web/shop/user/shop')
  async getUsers() {
    const userList = await this.shopService.getUser();
    console.log('userList:', userList);
    return {
      userList: userList,
    };
  }

  @Get('user/duplicate')
  async checkName(@Query('userName') userName: string) {
    console.log('userName:', userName);
    const name = await this.shopService.checkName(userName);
    console.log('name:', name);
    return name;
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Get('user/registerUser')
  @Render('web/shop/user/registerUser')
  registerUserRender() {
    return {};
  }

  @Post('user/registerUser')
  async createUser(@Body() bodyData: CreateUserDto) {
    console.log('controllerCreateUser: ', bodyData);
    const newUser = await this.shopService.createUser(bodyData);
    console.log('newUser:', newUser);
    return newUser;
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
