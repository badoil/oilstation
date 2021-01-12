import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    const user = this.prisma.user.findMany();

    if (!user) {
      return new HttpException('NOT_JOIN', HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async createUser(createUserDto) {
    const user = this.prisma.user.create({
      data: {
        name: createUserDto.name,
        phoneNumber: createUserDto.phoneNumber,
        oilAmount: createUserDto.oilAmount,
        bikeNumber: createUserDto.bikeNumber,
      },
    });
    return user;
  }
}
