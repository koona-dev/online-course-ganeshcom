import { Controller, Request, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

import { UserType } from '../users/schemas/users.schema';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  signup(
    @Body()
    userDto: CreateUserDto,
  ): Promise<UserType> {
    return this.userService.create(userDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
}
