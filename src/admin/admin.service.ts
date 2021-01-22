import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { sharedUtils } from '../common/util/shared.utils';
import { CreateShopDto } from './dto/create.shop.dto';
import { CreateAdminDto } from './dto/create.admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async findOne(name: string): Promise<any | undefined> {
    return this.prisma.admin.findFirst({
      where: {
        id: name,
      },
    });
  }

  async getShop(query) {
    // where 조건
    let where;
    const paging = await sharedUtils.pageUtil(query.page, query.pageSize);
    console.log('paging', paging);
    if (query.keyword != '') {
      where = { shopName: query.keyword };
    }
    const shopList = await this.prisma.shop.findMany({
      where: where,
      skip: paging.skip,
      take: paging.take,
      orderBy: { regDt: 'desc' },
    });

    const totalCount = await this.prisma.shop.count({
      where: where,
    });
    console.log('shopList', shopList);
    return {
      shopList: shopList,
      totalCount: totalCount,
    };
  }

  async findByShopName(shopName) {
    return await this.prisma.shop.findMany({
      where: {
        shopName: shopName,
      },
    });
  }

  async createAdmin(adminData: CreateAdminDto) {
    const password = await bcrypt.hash(adminData.PASSWORD, 12);
    const date = new Date();
    return this.prisma.admin.create({
      data: {
        id: adminData.ID,
        password: password,
        regId: 'SYSTEM',
        regDt: date,
      },
    });
  }

  async createShop(shopData: CreateShopDto, adminID?: string) {
    //const password = await bcrypt.hash(shopData.PASSWORD, 12);
    const date = new Date();

    return this.prisma.shop.create({
      data: {
        shopName: shopData.SHOP_NAME,
        password: shopData.PASSWORD,
        regId: adminID || 'SYSTEM',
        regDt: date,
      },
    });
  }

  async updateShop(shopData, req) {
    //const password = await bcrypt.hash(shopData.PASSWORD, 12);
    const date = new Date();

    const shop = await this.prisma.shop.findFirst({
      where: {
        shopName: shopData.SHOP_NAME,
      },
    });
    if (!shop) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }

    return this.prisma.shop.update({
      where: {
        shopKey: shop.shopKey,
      },
      data: {
        shopName: shopData.shopName,
        password: shopData.PASSWORD,
        // REG_ID: 'SYSTEM',
        // REG_DT:
        updId: req.user.id,
        updDt: date,
      },
    });
  }

  async deleteShop(shopKey) {
    return await this.prisma.shop.delete({
      where: {
        shopKey: Number(shopKey),
      },
    });
  }
}
