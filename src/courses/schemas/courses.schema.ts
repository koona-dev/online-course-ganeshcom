//schema.ts
import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { enrollments } from 'src/enrollments/schemas/enrollment.schema';

import { users } from 'src/users/schemas/users.schema';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  instructorId: integer('instructor_id').references(() => users.id),
  title: varchar('title', { length: 50 }).notNull(),
  category: varchar('category', { length: 20 }).notNull(),
  price: integer('price').notNull(),
  description: varchar('description', { length: 100 }).notNull(),
  rating: doublePrecision('rating').notNull(),
  discount: doublePrecision('discount').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const courseRelations = relations(courses, ({ one, many }) => ({
  user: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  enrollments: many(enrollments),
}));

export type CoursesType = typeof courses.$inferSelect;
