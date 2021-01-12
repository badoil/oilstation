import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  createAdmin(adminData) {
    return this.prisma.admin.create({
      data: {
        name: adminData.name,
        password: adminData.password,
      },
    });
  }
}
