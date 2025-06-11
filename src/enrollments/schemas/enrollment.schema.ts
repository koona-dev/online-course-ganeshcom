//schema.ts
import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { courses } from 'src/courses/schemas/courses.schema';

import { orders } from 'src/orders/schemas/orders.schema';
import { users } from 'src/users/schemas/users.schema';
import { CourseStatus } from '../constants/course-status';

export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  courseId: integer('course_id')
    .references(() => courses.id)
    .notNull(),
  orderId: integer('order_id')
    .references(() => orders.id)
    .notNull(),
  alreadyPurchased: boolean('already_purchased').default(false),
  courseStatus: varchar('course_status').default(CourseStatus.NOT_STARTED),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const enrollmentRelations = relations(enrollments, ({ one, many }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  courses: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
  orders: one(orders, {
    fields: [enrollments.orderId],
    references: [orders.id],
  }),
}));

export type EnrollmentsType = typeof enrollments.$inferSelect;
