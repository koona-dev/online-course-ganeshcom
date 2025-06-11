//schema.ts
import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { enrollments } from 'src/enrollments/schemas/enrollment.schema';
import { payments } from 'src/payments/schemas/payment.schema';

import { users } from 'src/users/schemas/users.schema';
import { OrderStatus } from '../constants/order-status';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id')
    .references(() => users.id)
    .notNull(),
  quantity: integer('quantity').default(0),
  totalPrice: integer('total_price').default(0),
  orderStatus: varchar('order_status').default(OrderStatus.CREATED),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.studentId],
    references: [users.id],
  }),
  enrollments: many(enrollments),
  payments: many(payments),
}));

export type OrdersType = typeof orders.$inferSelect;
