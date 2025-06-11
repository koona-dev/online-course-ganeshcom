//schema.ts
import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { courses } from 'src/courses/schemas/courses.schema';
import { enrollments } from 'src/enrollments/schemas/enrollment.schema';
import { orders } from 'src/orders/schemas/orders.schema';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 20 }).notNull(),
  email: varchar('email', { length: 20 }).notNull(),
  password: varchar('password', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  role: varchar('role', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  courses: many(courses),
  orders: many(orders),
  enrollments: many(enrollments),
}));

export type UserType = typeof users.$inferSelect;
