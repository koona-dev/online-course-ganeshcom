//schema.ts
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { payments } from 'src/payments/schemas/payment.schema';

import { users } from 'src/users/schemas/users.schema';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id')
    .references(() => users.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  totalPrice: integer('total_price').notNull(),
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
