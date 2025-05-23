//drizzle.module.ts
import { Module } from '@nestjs/common';
import { DatabaseAsyncProvider, DatabaseProvider } from './database.provider';

@Module({
  providers: [...DatabaseProvider],
  exports: [DatabaseAsyncProvider],
})
export default class DatabaseModule {}
