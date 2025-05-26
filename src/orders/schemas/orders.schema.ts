//schema.ts
import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from 'src/users/schemas/users.schema';
import OrderStatus from '../constants/order-status.constant';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id')
    .references(() => users.id)
    .notNull(),
  totalAmount: integer('total_amount').notNull(),
  orderMethod: varchar('order_method').notNull(),
  orderStatus: varchar('order_status')
    .notNull()
    .default(OrderStatus.PENDING),
  paidAt: timestamp('paid_at').notNull().defaultNow(),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.studentId],
    references: [users.id],
  }),
}));

export type OrdersType = typeof orders.$inferSelect;
