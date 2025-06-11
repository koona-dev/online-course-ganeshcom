import { defineConfig } from 'drizzle-kit';

const env = process.env;

export default defineConfig({
  dialect: 'postgresql',
  schema: [
    './src/users/schemas/users.schema.ts',
    './src/courses/schemas/courses.schema.ts',
    './src/orders/schemas/orders.schema.ts',
    './src/enrollments/schemas/enrollment.schema.ts',
    './src/payments/schemas/payment.schema.ts',
  ],
  out: './drizzle/migrations',
  dbCredentials: {
    host: 'localhost',
    port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME ?? '',
    ssl: false,
  },
  migrations: {
    table: 'migrations',
    schema: 'public',
  },
  verbose: true,
  strict: true,
  breakpoints: true,
});
