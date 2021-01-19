import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ShopService } from 'src/shop/shop.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private adminService: AdminService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
    role: string,
  ): Promise<any> {
    if (role === 'user') {
      const user = await this.userService.findOne(username);
      if (!user || !(await bcrypt.compare(pass, user.password))) {
        return null;
      }

      const { password, ...result } = user;
      result['role'] = 'user';
      return result;
    }

    if (role === 'shop') {
      const shop = await this.shopService.findOne(username);
      if (!shop || !(await bcrypt.compare(pass, shop.password))) {
        return null;
      }
      const { password, ...result } = shop;
      result['role'] = 'shop';
      return result;
    }

    if (role === 'admin') {
      const admin = await this.adminService.findOne(username);
      if (!admin || !(await bcrypt.compare(pass, admin.password))) {
        return null;
      }
      const { password, ...result } = admin;
      result['role'] = 'admin';
      return result;
    }

    return null;
  }
}
