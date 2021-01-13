import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  createAdmin(adminData) {
    // return this.prisma.aDMIN.create({
    //   data: {
    //     name: adminData.name,
    //     password: adminData.password,
    //   },
    // });
  }

  createShop(shopData) {
    return this.prisma.sHOP;
  }
}
