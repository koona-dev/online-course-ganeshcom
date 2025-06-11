import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import DatabaseModule from 'src/database/database.module';
import { OrdersController } from './orders.controller';
import { CoursesModule } from 'src/courses/courses.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';

@Module({
  imports: [DatabaseModule, CoursesModule, EnrollmentsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
