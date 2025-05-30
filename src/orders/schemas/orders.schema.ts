//schema.ts
import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { payments } from 'src/payments/schemas/payment.schema';

import { users } from 'src/users/schemas/users.schema';

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
  payments: one(payments),
}));

export type OrdersType = typeof orders.$inferSelect;
