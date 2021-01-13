import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
