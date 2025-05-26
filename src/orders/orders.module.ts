import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import DatabaseModule from 'src/database/database.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
