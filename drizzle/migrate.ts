import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import pg from 'pg';
import { exit } from 'process';

import * as CourseSchema from '../src/courses/schema/course.schema';

await (async () => {
  const env = process.env;
  const DATABASE_URL = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@localhost:${env.DB_PORT}/${env.DB_NAME}`;

  const pool = new pg.Pool({
    connectionString: DATABASE_URL,
  });

  //   let db: NodePgDatabase<typeof CourseSchema> | null = null;
  const db = drizzle(pool, {
    schema: {
      ...CourseSchema,
    },
  });

  // Look for migrations in the src/drizzle/migrations folder
  const migrationPath = path.join(process.cwd(), 'drizzle/migrations');

  // Run the migrations
  await migrate(db, { migrationsFolder: migrationPath });

  console.log('Migration complete');
  exit(0);
})();
