import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { query, Request, Response } from 'express';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { SearchShopDto } from '../admin/dto/search.shop.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateOilHistoryDto } from './dto/create.oilHistory.dto';
import { SearchUserDto } from './dto/search.user.dto';
import { REFUSED } from 'dns';

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

  @UseGuards(RolesGuard)
  @Get('user/list')
  @Roles('shop')
  @Render('web/shop/user/list')
  async getUsers(@Query() query: SearchUserDto) {
    console.log('controllerGetUsersQuery', query);
    console.log('query.page', query.page);
    if (query.page == null) {
      query.page = 1;
    }
    query.pageSize = 10;
    console.log('query', query);

    const userList = await this.shopService.getUsers(query);
    console.log('controllerGetUser:', userList);
    return {
      query: query,
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

  // @Get('user/searchUser')
  // async getSearchUser(@Query() query: string) {
  //   console.log('controllerGetSearchUserQuery:', query);
  //   const user = await this.shopService.getSearchUser(query);
  //   console.log('controllerGetSearchUser:', user);
  //   return user;
  // }

  @Get('user/searchUserOil')
  async getSearchUserOil(@Query() query: string) {
    console.log('controllerGetSearchUserQuery:', query);
    const user = await this.shopService.getSearchUserOilHistory(query);
    console.log('controllerGetSearchUser:', user);
    return user;
  }

  @Get('user/searchUser/list')
  @Render('web/shop/user/searchUser')
  async getSearchUserOilHistory(@Query() query: SearchUserDto) {
    console.log('controllerGetSearchUserOilHistoryQuery:', query);
    if (query.page == null) {
      query.page = 1;
    }
    query.pageSize = 10;
    console.log('query', query);

    const userList = await this.shopService.getSearchUserOilHistoryList(query);

    console.log('getSearchUserOilHistoryUserList:', userList);
    return {
      query: query,
      userList: userList,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Get('user/registerUser')
  @Render('web/shop/user/registerUser')
  registerUserRender() {
    return {};
  }

  @Post('user/registerUser')
  async createUser(@Body() bodyData: CreateUserDto, @Req() req) {
    console.log('controllerCreateUser: ', bodyData);
    const newUser = await this.shopService.createUser(bodyData, req);
    console.log('newUser:', newUser);
    return newUser;
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Post('/user/createOilHistory')
  async createOilHistory(@Body() bodyData: CreateOilHistoryDto, @Req() req) {
    const oil = this.shopService.createOilHistory(bodyData, req);
    console.log('controllerCreateOilHistory:', oil);
    return oil;
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Put('/user/updateUser')
  updateUser(
    @Body() bodyData: UpdateUserDto,
    @Req() req,
    @Res() res: Response,
  ) {
    console.log('controllerUpdateBodyData:', bodyData);
    return this.shopService.updateUser(bodyData, req, res);
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Get('user/updateUser')
  @Render('web/shop/user/updateUser')
  goToUpdateUser() {
    return {};
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Delete('user/deleteUser')
  async deleteUser(@Query('id') id: string) {
    const deletedUser = await this.shopService.deleteUser(id);
    console.log('controllerDeleteUser:', deletedUser);
    return deletedUser;
  }
}
