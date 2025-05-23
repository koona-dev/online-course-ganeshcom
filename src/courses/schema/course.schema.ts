//schema.ts
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const Courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 20 }),
  email: varchar('email', { length: 20 }),
  password: varchar('password', { length: 20 }),
  phone: varchar('phone', { length: 20 }),
  role: varchar('role', { length: 20 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
