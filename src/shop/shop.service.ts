import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

// import { SHOP } from '@prisma/client';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async findOne(name: string): Promise<any | undefined> {
    return this.prisma.shop.findFirst({
      where: {
        shopName: name,
      },
    });
  }

  getPageUtil(page, pageSize) {
    console.log('page', page);
    console.log('pageSize', pageSize);
    return {
      skip: (page - 1) * pageSize,
      take: pageSize,
    };
  }

  async getUsers(query) {
    let where;
    const paging = await this.getPageUtil(query.page, query.pageSize);
    console.log('paging', paging);
    if (query.keyword != '') {
      where = { NAME: query.keyword };
    }
    const userList = await this.prisma.user.findMany({
      where: where,
      skip: paging.skip,
      take: paging.take,
      orderBy: { regDt: 'desc' },
      include: {
        OilHistory: {
          select: {
            oilKey: true,
            userKey: true,
            shopKey: true,
            plusMinus: true,
            oilL: true,
            regDt: true,
          },
          orderBy: {
            oilKey: 'asc',
          },
        },
        BikeNumber: {
          select: {
            bikeNumber: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.user.count({
      where: where,
    });
    console.log('serviceGetUserList', userList);
    for (let i = 0; i < userList.length; i++) {
      delete userList[i].password;
    }
    console.log('serviceGetUserList2:', userList);

    return {
      shopList: userList,
      totalCount: totalCount,
    };
  }

  async checkName(userName) {
    const user = await this.prisma.user.findFirst({
      where: {
        name: userName,
      },
    });
    console.log('serviceCheckName:', user);
    delete user.password;
    console.log('serviceCheckName2:', user);
    return user;
  }

  async getSearchUserOilHistory(query) {
    console.log('serviceGetSearchUserOilHistoryQuery:', query);

    let where;

    where = query.keyword;
    console.log('where:', where);

    const user = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            name: where,
          },
          {
            phoneNumber: where,
          },
        ],
      },
      include: {
        OilHistory: {
          select: {
            oilKey: true,
            userKey: true,
            shopKey: true,
            plusMinus: true,
            oilL: true,
            regDt: true,
          },
          orderBy: {
            oilKey: 'desc',
          },
        },
        BikeNumber: {
          select: {
            bikeNumber: true,
          },
        },
      },
    });
    console.log('serviceGetSearchUserOilHistory:', user);
    user.map((item) => delete item.password);
    console.log('serviceGetSearchUserOilHistory2:', user);
    return user;
  }

  async getSearchUserOilHistoryList(query) {
    console.log('serviceGetSearchUserOilHistoryQuery:', query);

    let where;
    const paging = await this.getPageUtil(query.page, query.pageSize);
    console.log('paging', paging);
    if (query.keyword != '') {
      where = query.keyword;
    }
    console.log('where:', where);

    const user = await this.prisma.user.findMany({
      skip: paging.skip,
      take: paging.take,
      orderBy: { regDt: 'desc' },
      where: {
        userKey: +where,
      },
      include: {
        OilHistory: {
          select: {
            oilKey: true,
            userKey: true,
            shopKey: true,
            plusMinus: true,
            oilL: true,
            regDt: true,
          },
          orderBy: {
            oilKey: 'desc',
          },
        },
        BikeNumber: {
          select: {
            bikeNumber: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.oilHistory.count({
      where: {
        userKey: +where,
      },
    });
    console.log('serviceOilHistoryList:', user);
    user.map((item) => delete item.password);
    console.log('serviceOilHistoryList2:', user);
    return {
      userList: user,
      totalCount: totalCount,
    };
  }

  async getBikeNumber(userKey) {
    console.log('serviceGetBikeNumberUserkey:', userKey);
    const bikeNumber = await this.prisma.bikeNumber.findFirst({
      where: {
        userKey: +userKey,
      },
    });
    console.log('serviceGetBikeNumber:', bikeNumber);
    return bikeNumber;
  }

  async createUser(bodyData, req) {
    const hashedPassword = await bcrypt.hash(bodyData.PASSWORD, 12);
    const date = new Date();
    const shopName = req.user.SHOP_NAME;
    const shopKey = req.user.SHOP_KEY;

    const newUser = await this.prisma.user.create({
      data: {
        name: bodyData.NAME,
        password: hashedPassword,
        phoneNumber: bodyData.PHONE_NUMBER,
        oilL: +bodyData.OIL_L,
        regId: shopName,
        regDt: date,
        OilHistory: {
          create: {
            oilL: +bodyData.OIL_L,
            regId: shopName,
            regDt: date,
            shopKey: shopKey,
          },
        },
        BikeNumber: {
          create: {
            bikeNumber: bodyData.PASSWORD,
            regId: shopName,
            regDt: date,
          },
        },
      },
    });
    console.log('newUser:', newUser);
    return newUser;
  }

  async addBikeNumber(bodyData, req) {
    const date = new Date();
    const shopName = req.user.SHOP_NAME;

    const bikeNumber = await this.prisma.bikeNumber.create({
      data: {
        bikeNumber: bodyData.bikeNumber,
        regId: shopName,
        regDt: date,
        User: {
          connect: {
            userKey: bodyData.userKey, // user key 프론트에서 가져와서 넣어야 함
          },
        },
      },
    });
    return bikeNumber;
  }

  async updateUser(bodyData, req, res) {
    const date = new Date();
    const shopName = req.user.SHOP_NAME;
    const user = await this.prisma.user.findFirst({
      where: {
        phoneNumber: bodyData.PHONE_NUMBER,
      },
    });
    if (!user) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }
    console.log('serviceUser:', user);

    const userUpdate = await this.prisma.user.update({
      where: {
        userKey: user.userKey,
      },
      data: {
        name: user.name,
        phoneNumber: user.phoneNumber,
        password: user.password,
        oilL: +bodyData.OIL_L,
        updId: shopName,
        updDt: date,
      },
    });

    return res.status(200).json({
      success: true,
      code: 'SUCCESS',
      msg: '업데이트 되었습니다.',
      data: userUpdate,
    });
  }

  async createOilHistory(bodyData, req) {
    const date = new Date();
    const shopName = req.user.SHOP_NAME;
    const oil = await this.prisma.oilHistory.create({
      data: {
        shopKey: req.user.SHOP_KEY,
        plusMinus: bodyData.PLUS_MINUS,
        oilL: bodyData.OIL_L,
        regId: shopName,
        regDt: date,
        User: {
          connect: {
            userKey: bodyData.USER_KEY,
          },
        },
      },
    });
    console.log('oil: ', oil);
    return oil;
  }

  async deleteUser(id) {
    const deletedOilHistory = await this.prisma.oilHistory.deleteMany({
      where: {
        userKey: +id,
      },
    });
    console.log('deletedOilHistory:', deletedOilHistory);
    if (deletedOilHistory.count !== 1) {
      return {
        count: deletedOilHistory.count,
      };
    }

    const deletedBikeNumber = await this.prisma.bikeNumber.deleteMany({
      where: {
        userKey: +id,
      },
    });
    console.log('deletedBikeNumber:', deletedBikeNumber);
    if (deletedBikeNumber.count !== 1) {
      return {
        count: deletedBikeNumber.count,
      };
    }

    const deletedUser = await this.prisma.user.deleteMany({
      where: {
        userKey: +id,
      },
    });
    console.log('deletedUser:', deletedUser);
    if (deletedUser.count !== 1) {
      return {
        count: deletedUser.count,
      };
    }

    return {
      count: deletedUser.count,
    };
  }
}
