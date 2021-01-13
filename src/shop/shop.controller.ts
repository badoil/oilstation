import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { Response } from 'express';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

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
