import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

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

  async getUsers() {
    const users = await this.prisma.uSER.findMany(); //  currntPage,totalPage,totalCount
    return users;
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
      },
    });
    return user;
  }

  async createUser(bodyData) {
    const hashedPassword = await bcrypt.hash(bodyData.PASSWORD, 12);
    const date = new Date();

    //shop id 이용해서 shop_key를 알아내야 함

    const newUser = await this.prisma.uSER.create({
      data: {
        NAME: bodyData.NAME,
        PASSWORD: hashedPassword,
        PHONE_NUMBER: bodyData.PHONE_NUMBER,
        OIL_L: +bodyData.OIL_L,
        REG_ID: 'shop_name', // shop 이름 들어가야할것
        REG_DT: date,
        OIL_HISTORY: {
          create: {
            OIL_L: +bodyData.OIL_L,
            REG_ID: 'shop_name',
            REG_DT: date,
            SHOP_KEY: 1, // shop key 변수로 넣어야함
          },
        },
      },
    });
    console.log('newUser:', newUser);
    return newUser;
  }

  async updateUser(bodyData, res) {
    let hashedPassword = '';
    if (bodyData.PASSWORD) {
      hashedPassword = await bcrypt.hash(bodyData.PASSWORD, 12);
    }
    const date = new Date();

    const user = await this.prisma.uSER.findFirst({
      where: {
        NAME: bodyData.NAME,
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
        NAME: bodyData.NAME,
        PHONE_NUMBER: bodyData.PHONE_NUMBER,
        PASSWORD: hashedPassword,
        OIL_L: +bodyData.OIL_L,
        UPD_ID: 'req.shop',
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

  async createOilHistory(bodyData) {
    const date = new Date();
    const oil = await this.prisma.oIL_HISTORY.create({
      data: {
        SHOP_KEY: bodyData.SHOP_KEY,
        PLUS_MINUS: bodyData.PLUS_MINUS,
        OIL_L: bodyData.OIL_L,
        REG_ID: 'req.id',
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

  async deleteUser(phoneNumber, res) {
    const user = await this.prisma.uSER.findFirst({
      where: {
        PHONE_NUMBER: phoneNumber,
      },
    });
    if (!user) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }

    const deletedUser = await this.prisma.uSER.delete({
      where: {
        USER_KEY: user.USER_KEY,
      },
    });

    return res.status(200).json({
      success: true,
      code: 'SUCCESS',
      msg: '삭제 되었습니다.',
    });
  }
}
