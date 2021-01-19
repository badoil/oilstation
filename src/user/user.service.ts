import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { USER } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    const user = await this.prisma.user.findMany({});
    if (!user) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }

    return user.map((elem) => {
      const { password, ...result } = elem;
      return result;
    });
  }
  async findOne(name: string): Promise<any | undefined> {
    return this.prisma.user.findFirst({
      where: {
        phoneNumber: name,
      },
    });
  }
}
