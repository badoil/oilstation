import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    return this.prisma.user.findMany();
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
