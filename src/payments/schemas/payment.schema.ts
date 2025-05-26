//schema.ts
import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { orders } from 'src/orders/schemas/orders.schema';
import PaymentStatus from '../constants/payment-status.constant';

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .references(() => orders.id)
    .notNull(),
  totalPrice: integer('total_price').notNull(),
  paymentMethod: varchar('payment_method').notNull(),
  paymentStatus: varchar('payment_status').default(PaymentStatus.PENDING),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const paymentRelations = relations(payments, ({ one, many }) => ({
  orders: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

export type PaymentsType = typeof payments.$inferSelect;
