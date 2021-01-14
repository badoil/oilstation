import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(
    username: string,
    pass: string,
    role: string,
  ): Promise<any> {
    if (role === 'user') {
      const user = await this.userService.findOne(username);
      if (!user) {
        return null;
      }
      if (!(await bcrypt.compare(pass, user.PASSWORD))) {
        return null;
      }
      const { PASSWORD, ...result } = user;
      result['role'] = 'user';
      return result;
    }

    if (role === 'shop') {
      return null;
    }

    if (role === 'admin') {
      return null;
    }
  }
}
