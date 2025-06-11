import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users, UserType } from './schemas/users.schema';
import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { queryFilter } from 'src/common/utils/query-filter';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly userRepository: NodePgDatabase<UserType>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserType> {
    const salt = await bcrypt.genSalt(); // 2.
    const hashedPassword = await bcrypt.hash(userDto.password, salt); // 3.

    const savedUser = await this.userRepository
      .insert(users)
      .values({ ...userDto, password: hashedPassword })
      .returning();

    return savedUser[0];
  }

  async findOne(
    dataFilter: { [field: string]: any },
    options?: {
      mode?: 'and' | 'or';
    },
  ): Promise<UserType> {
    const order = this.userRepository.select().from(users);

    const result = await queryFilter<UserType>(
      order,
      users,
      dataFilter,
      options,
    );

    return result[0];
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
