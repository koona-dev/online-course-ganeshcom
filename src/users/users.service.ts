import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, SQL } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users, UserType } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: NodePgDatabase<UserType>) {}

  async create(userDto: CreateUserDto): Promise<UserType> {
    const salt = await bcrypt.genSalt(); // 2.
    const hashedPassword = await bcrypt.hash(userDto.password, salt); // 3.

    const savedUser = await this.userRepository
      .insert(users)
      .values({ ...userDto, password: hashedPassword })
      .returning();

    return savedUser[0];
  }

  async findOne(filter: SQL<unknown>): Promise<UserType> {
    const user = await this.userRepository.select().from(users).where(filter);

    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user[0];
  }

  async findAll(): Promise<UserType[]> {
    return await this.userRepository.select().from(users);
  }

  async update(
    userId: number,
    updateAuthDto: UpdateUserDto,
  ): Promise<UserType> {
    const updatedUser = await this.userRepository
      .update(users)
      .set(updateAuthDto)
      .where(eq(users.id, userId))
      .returning();

    return updatedUser[0];
  }

  async remove(userId: number) {
    return await this.userRepository.delete(users).where(eq(users.id, userId));
  }
}
