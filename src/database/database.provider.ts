//drizzle.provider.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as CourseSchema from '../courses/schema/course.schema';
import { ConfigService } from '@nestjs/config';

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

      return drizzle(pool, { schema: { ...CourseSchema } });
    },
  },
];
