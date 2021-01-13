import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { USER } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    const user = this.prisma.uSER.findMany();

    if (!user) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }

    return user;
  }
  async findOne(name: string): Promise<USER | undefined> {
    return this.prisma.uSER.findFirst({
      where: {
        PHONE_NUMBER: name,
      },
    });
  }

  async createUser(createUserDto) {}
}
