//drizzle.provider.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

import * as usersSchema from 'src/users/schemas/users.schema';
import * as coursesSchema from '../courses/schemas/courses.schema';
import * as ordersSchema from 'src/orders/schemas/orders.schema';

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
        schema: { ...usersSchema, ...coursesSchema, ...ordersSchema },
      });
    },
  },
];
