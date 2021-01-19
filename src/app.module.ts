import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor, RavenModule } from 'nest-raven';

@Module({
  imports: [UserModule, AdminModule, AuthModule, ShopModule, RavenModule],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    { provide: APP_INTERCEPTOR, useValue: new RavenInterceptor() },
  ],
})
export class AppModule {}
