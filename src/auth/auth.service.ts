import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { PayloadType } from './constants/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    try {
      const filter = {
        email: loginDto.email,
        password: loginDto.password,
      };

      const user = await this.userService.findOne(filter); // 1.

      const passwordMatched = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (passwordMatched) {
        const payload: PayloadType = {
          email: user.email,
          userId: user.id,
          role: user.role,
        };

        console.log(payload);
        return {
          accessToken: this.jwtService.sign(payload),
        };
      } else {
        throw new UnauthorizedException('Password does not match'); // 5.
      }
    } catch (error) {
      throw new UnauthorizedException(error); // 5.
    }
  }
}
