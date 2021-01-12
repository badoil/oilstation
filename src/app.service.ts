import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  auth(login) {
    const user = this.prisma.user.findFirst({
      where: {
        phoneNumber: login.id,
        bikeNumber: login.password,
      },
    });

    if (!user) {
      console.log('dwdw');
      throw new HttpException('NO_AUTH', HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
