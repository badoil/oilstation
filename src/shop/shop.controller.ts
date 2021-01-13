import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ShopService } from './shop.service';

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
}
