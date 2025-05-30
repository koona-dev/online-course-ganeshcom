import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { QueryResult } from 'pg';

import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { orders, OrdersType } from './schemas/orders.schema';
import { UpdateOrderDto } from './dto/update-orders.dto';
import queryFilter from 'src/common/utils/query-filter';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly ordersRepository: NodePgDatabase<OrdersType>,
  ) {}

  async create(studentId: number): Promise<OrdersType> {
    const savedOrders = await this.ordersRepository
      .insert(orders)
      .values({ studentId })
      .returning();

    return savedOrders[0];
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

  async findOne(
    dataFilter: { [field: string]: any },
    options?: {
      mode?: 'and' | 'or';
    },
  ): Promise<OrdersType> {
    const order = this.ordersRepository.select().from(orders);

    const result = await queryFilter<OrdersType>(
      order,
      orders,
      dataFilter,
      options,
    );
    return result[0];
  }

  async update(
    orderId: number,
    updateOrdersDto: UpdateOrderDto,
  ): Promise<OrdersType> {
    const updatedOrder = await this.ordersRepository
      .update(orders)
      .set(updateOrdersDto)
      .where(eq(orders.id, orderId))
      .returning();

    return updatedOrder[0];
  }

  async remove(orderId: number): Promise<QueryResult<never>> {
    const deletedOrder = await this.ordersRepository
      .delete(orders)
      .where(eq(orders.id, orderId));

    return deletedOrder;
  }
}
