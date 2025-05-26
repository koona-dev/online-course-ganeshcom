import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { QueryResult } from 'pg';

import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { CreateOrderDto } from './dto/create-orders.dto';
import { orders, OrdersType } from './schemas/orders.schema';
import { UpdateOrderDto } from './dto/update-orders.dto';
import queryFilter from 'src/common/utils/query-filter';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly ordersRepository: NodePgDatabase<OrdersType>,
  ) {}

  async create(
    studentId: number,
    createOrdersDto: CreateOrderDto,
  ): Promise<OrdersType> {
    const savedCourse = await this.ordersRepository
      .insert(orders)
      .values({ ...createOrdersDto, studentId })
      .returning();

    return savedCourse[0];
  }

  async findAll(
    dataFilter?: { [field: string]: any },
    options?: {
      mode?: 'and' | 'or';
    },
  ): Promise<OrdersType[]> {
    const query = this.ordersRepository.select().from(orders);

    if (dataFilter) {
      return await queryFilter<OrdersType>(query, orders, dataFilter, options);
    }
    return query;
  }

  async findOne(orderId: number): Promise<OrdersType> {
    const order = await this.ordersRepository
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    return order[0];
  }

  async update(
    orderId: number,
    updateOrdersDto: UpdateOrderDto,
  ): Promise<OrdersType> {
    const updatedCourse = await this.ordersRepository
      .update(orders)
      .set(updateOrdersDto)
      .where(eq(orders.id, orderId))
      .returning();

    return updatedCourse[0];
  }

  async remove(orderId: number): Promise<QueryResult<never>> {
    const deletedOrder = await this.ordersRepository
      .delete(orders)
      .where(eq(orders.id, orderId));

    return deletedOrder;
  }
}
