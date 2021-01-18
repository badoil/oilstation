import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Request,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { request, Response } from 'express';

// import { SHOP } from '@prisma/client';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async findOne(name: string): Promise<any | undefined> {
    return this.prisma.sHOP.findFirst({
      where: {
        SHOP_NAME: name,
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
    const userList = await this.prisma.uSER.findMany({
      where: where,
      skip: paging.skip,
      take: paging.take,
      orderBy: { REG_DT: 'desc' },
      include: {
        OIL_HISTORY: {
          select: {
            OIL_KEY: true,
            USER_KEY: true,
            SHOP_KEY: true,
            PLUS_MINUS: true,
            OIL_L: true,
            REG_DT: true,
          },
          orderBy: {
            OIL_KEY: 'asc',
          },
        },
        BIKE_NUMBER: {
          select: {
            BIKE_NUMBER: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.uSER.count({
      where: where,
    });
    console.log('serviceGetUserList', userList);
    return {
      shopList: userList,
      totalCount: totalCount,
    };
    // const users = await this.prisma.uSER.findMany(); //  currntPage,totalPage,totalCount
    // return users;
  }

  async checkName(userName) {
    return await this.prisma.uSER.findFirst({
      where: {
        NAME: userName,
      },
    });
  }

  async getSearchUser(query) {
    console.log('serviceGetSearchUserQuery:', query);
    let userName = '';
    let phoneNumber = '';
    if (query.userName) {
      userName = query.userName;
    } else if (query.phoneNumber) {
      phoneNumber = query.phoneNumber;
    }
    const user = await this.prisma.uSER.findMany({
      where: {
        OR: [
          {
            NAME: userName,
          },
          {
            PHONE_NUMBER: phoneNumber,
          },
        ],
      },
      select: {
        OIL_HISTORY: {
          select: {
            OIL_KEY: true,
            USER_KEY: true,
            SHOP_KEY: true,
            PLUS_MINUS: true,
            OIL_L: true,
          },
          orderBy: {
            OIL_KEY: 'desc',
          },
        },
      },
    });
    return user;
  }

  async getSearchUserOilHistory(query) {
    console.log('serviceGetSearchUserOilHistoryQuery:', query);

    let where;
    if (query.keyword != '') {
      where = query.keyword;
    }
    console.log('where:', where);
    // let userName = '';
    // let phoneNumber = '';
    // if (query.userName) {
    //   userName = query.userName;
    // } else if (query.phoneNumber) {
    //   phoneNumber = query.phoneNumber;
    // }
    const user = await this.prisma.uSER.findMany({
      // skip: paging.skip,
      // take: paging.take,
      // orderBy: { REG_DT: 'desc' },
      where: {
        OR: [
          {
            NAME: where,
          },
          {
            PHONE_NUMBER: where,
          },
        ],
      },
      include: {
        OIL_HISTORY: {
          select: {
            OIL_KEY: true,
            USER_KEY: true,
            SHOP_KEY: true,
            PLUS_MINUS: true,
            OIL_L: true,
            REG_DT: true,
          },
          orderBy: {
            OIL_KEY: 'desc',
          },
        },
        BIKE_NUMBER: {
          select: {
            BIKE_NUMBER: true,
          },
        },
      },
    });
    console.log('serviceGetSearchUserOilHistory:', user);
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
    // let userName = '';
    // let phoneNumber = '';
    // if (query.userName) {
    //   userName = query.userName;
    // } else if (query.phoneNumber) {
    //   phoneNumber = query.phoneNumber;햣
    // }
    const user = await this.prisma.uSER.findMany({
      skip: paging.skip,
      take: paging.take,
      orderBy: { REG_DT: 'desc' },
      where: {
        USER_KEY: +where,
      },
      include: {
        OIL_HISTORY: {
          select: {
            OIL_KEY: true,
            USER_KEY: true,
            SHOP_KEY: true,
            PLUS_MINUS: true,
            OIL_L: true,
            REG_DT: true,
          },
          orderBy: {
            OIL_KEY: 'desc',
          },
        },
        BIKE_NUMBER: {
          select: {
            BIKE_NUMBER: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.oIL_HISTORY.count({
      where: {
        USER_KEY: +where,
      },
    });
    return {
      userList: user,
      totalCount: totalCount,
    };
  }

  async createUser(bodyData, req) {
    const hashedPassword = await bcrypt.hash(bodyData.PASSWORD, 12);
    const date = new Date();
    const shopName = req.user.SHOP_NAME;
    const shopKey = req.user.SHOP_KEY;
    //shop id 이용해서 shop_key를 알아내야 함

    const newUser = await this.prisma.uSER.create({
      data: {
        NAME: bodyData.NAME,
        PASSWORD: hashedPassword,
        PHONE_NUMBER: bodyData.PHONE_NUMBER,
        OIL_L: +bodyData.OIL_L,
        REG_ID: shopName, // shop 이름 들어가야할것
        REG_DT: date,
        OIL_HISTORY: {
          create: {
            OIL_L: +bodyData.OIL_L,
            REG_ID: shopName,
            REG_DT: date,
            SHOP_KEY: shopKey, // shop key 변수로 넣어야함
          },
        },
        BIKE_NUMBER: {
          create: {
            BIKE_NUMBER: bodyData.PASSWORD,
            REG_ID: shopName,
            REG_DT: date,
          },
        },
      },
    });
    console.log('newUser:', newUser);
    return newUser;
  }

  async updateUser(bodyData, req, res) {
    // let hashedPassword = '';
    // if (bodyData.PASSWORD) {
    //   hashedPassword = await bcrypt.hash(bodyData.PASSWORD, 12);
    // }
    const date = new Date();
    const shopName = req.user.SHOP_NAME;
    const user = await this.prisma.uSER.findFirst({
      where: {
        PHONE_NUMBER: bodyData.PHONE_NUMBER,
      },
    });
    if (!user) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }
    console.log('serviceUser:', user);

    const userUpdate = await this.prisma.uSER.update({
      where: {
        USER_KEY: user.USER_KEY,
      },
      data: {
        NAME: user.NAME,
        PHONE_NUMBER: user.PHONE_NUMBER,
        PASSWORD: user.PASSWORD,
        OIL_L: +bodyData.OIL_L,
        UPD_ID: shopName,
        UPD_DT: date,
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
    const oil = await this.prisma.oIL_HISTORY.create({
      data: {
        SHOP_KEY: req.user.SHOP_KEY,
        PLUS_MINUS: bodyData.PLUS_MINUS,
        OIL_L: bodyData.OIL_L,
        REG_ID: shopName,
        REG_DT: date,
        USER: {
          connect: {
            USER_KEY: bodyData.USER_KEY,
          },
        },
      },
    });
    console.log('oil: ', oil);
    return oil;

    //const oilHistory = await this.prisma.oIL_HISTORY.update({});
  }

  async deleteUser(id) {
    const deletedOilHistory = await this.prisma.oIL_HISTORY.deleteMany({
      where: {
        USER_KEY: +id,
      },
    });
    console.log('deletedOilHistory:', deletedOilHistory);
    if (deletedOilHistory.count !== 1) {
      return {
        count: deletedOilHistory.count,
      };
    }

    const deletedBikeNumber = await this.prisma.bIKE_NUMBER.deleteMany({
      where: {
        USER_KEY: +id,
      },
    });
    console.log('deletedBikeNumber:', deletedBikeNumber);
    if (deletedBikeNumber.count !== 1) {
      return {
        count: deletedBikeNumber.count,
      };
    }

    const deletedUser = await this.prisma.uSER.deleteMany({
      where: {
        USER_KEY: +id,
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
