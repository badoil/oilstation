import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    console.log(user);
    if (user && (await bcrypt.compare(pass, user.PASSWORD))) {
      const { PASSWORD, ...result } = user;
      return result;
    }
    return null;
  }
}
