import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { QueryResult } from 'pg';

import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { payments, PaymentsType } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly paymentsRepository: NodePgDatabase<PaymentsType>,
  ) {}

  async create(createPaymentsDto: CreatePaymentDto): Promise<PaymentsType> {
    const savedCourse = await this.paymentsRepository
      .insert(payments)
      .values(createPaymentsDto)
      .returning();

    return savedCourse[0];
  }

  async findAll(): Promise<PaymentsType[]> {
    return await this.paymentsRepository.select().from(payments);
  }

  async findOne(paymentId: number): Promise<PaymentsType> {
    const payment = await this.paymentsRepository
      .select()
      .from(payments)
      .where(eq(payments.id, paymentId))
      .limit(1);

    return payment[0];
  }

  async update(
    paymentId: number,
    updatePaymentsDto: UpdatePaymentDto,
  ): Promise<PaymentsType> {
    const updatedCourse = await this.paymentsRepository
      .update(payments)
      .set(updatePaymentsDto)
      .where(eq(payments.id, paymentId))
      .returning();

    return updatedCourse[0];
  }
  async remove(paymentId: number): Promise<QueryResult<never>> {
    const deletedPayment = await this.paymentsRepository
      .delete(payments)
      .where(eq(payments.id, paymentId));

    return deletedPayment;
  }
}
