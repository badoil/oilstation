import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ShopService } from 'src/shop/shop.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, ShopService],
  exports: [AdminService],
})
export class AdminModule {}
