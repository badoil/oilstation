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
    const users = await this.prisma.uSER.findMany();
    return users;
  }

  async checkName(userName) {
    return await this.prisma.uSER.findFirst({
      where: {
        NAME: userName,
      },
    });
  }

  async getSearchUser(userName) {
    const user = await this.prisma.uSER.findMany({
      where: {
        NAME: userName,
      },
    });
    return user;
  }

  async createUser(bodyData) {
    const hashedPassword = await bcrypt.hash(bodyData.PASSWORD, 12);
    const date = new Date();

    return await this.prisma.uSER.create({
      data: {
        NAME: bodyData.NAME,
        PASSWORD: hashedPassword,
        PHONE_NUMBER: bodyData.PHONE_NUMBER,
        OIL_L: +bodyData.OIL_L,
        REG_ID: 'SYSTEM',
        REG_DT: date,
      },
    });
  }

  async updateUser(bodyData, res) {
    const date = new Date();

    const user = await this.prisma.uSER.findFirst({
      where: {
        PHONE_NUMBER: bodyData.PHONE_NUMBER,
      },
    });
    if (!user) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }

    const userUpdate = await this.prisma.uSER.update({
      where: {
        USER_KEY: user.USER_KEY,
      },
      data: {
        NAME: bodyData.NAME,
        PHONE_NUMBER: bodyData.PHONE_NUMBER,
        PASSWORD: bodyData.PASSWORD,
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
