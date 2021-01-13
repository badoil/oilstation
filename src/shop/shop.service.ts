import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async createUser(bodyData) {
    const hashedPassword = await bcrypt.hash('서울1234', 12);
    const date = new Date();

    // const oilHistory = await this.prisma.oIL_HISTORY.findFirst({
    //   where: {
    //     USER: {

    //     }
    //   }
    // })

    const user = await this.prisma.uSER.create({
      data: {
        NAME: bodyData.NAME,
        PHONE_NUMBER: bodyData.PHONE_NUMBER,
        PASSWORD: hashedPassword,
        OIL_L: 50,
        REG_ID: 'SYSTEM',
        REG_DT: date,
      },
    });
  }

  async getUser(phoneNumber) {
    const user = await this.prisma.uSER.findFirst({
      where: {
        PHONE_NUMBER: phoneNumber,
      },
    });

    return user;
  }

  async updateUser(phoneNumber) {
    const user = await this.prisma.uSER.delete({
      where: {},
    });
  }
}
