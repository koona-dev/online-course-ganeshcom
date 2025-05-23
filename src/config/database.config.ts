import { defineConfig } from 'drizzle-kit';

const env = process.env;
const DATABASE_URL = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@localhost:${env.DB_PORT}/${env.DB_NAME}`;

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/**/schema/**.schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
