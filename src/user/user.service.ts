import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    const user = this.prisma.User.findMany();

    if (!user) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async findOne(name) {
    return this.prisma.User.findFirst({
      where: {
        NAME: name,
      },
    });
  }

  async createUser(createUserDto) {
  }
}
