//drizzle.provider.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

import * as userSchema from 'src/users/schemas/users.schema';
import * as courseSchema from 'src/courses/schemas/courses.schema';
import * as orderSchema from 'src/orders/schemas/orders.schema';
import * as enrollmentSchema from 'src/enrollments/schemas/enrollment.schema';
import * as paymentSchema from 'src/payments/schemas/payment.schema';

export const DatabaseAsyncProvider = 'DatabaseAsyncProvider';

export const DatabaseProvider = [
  {
    provide: DatabaseAsyncProvider,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const connectionString = configService.getOrThrow('DATABASE_URL');

      const pool = new Pool({
        connectionString,
      });

      return drizzle(pool, {
        schema: {
          ...userSchema,
          ...courseSchema,
          ...orderSchema,
          ...enrollmentSchema,
          ...paymentSchema,
        },
      });
    },
  },
];
