import { Module } from '@nestjs/common';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UserModule, ShopModule, AdminModule, PassportModule],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
