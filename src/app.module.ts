import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DatabaseModule from './database/database.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CoursesController } from './courses/courses.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { OrdersModule } from './orders/orders.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CoursesModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    EnrollmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(/*private dataSource: DataSource*/) {
    // console.log('dbName ', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    consumer.apply(LoggerMiddleware).forRoutes(CoursesController); //option no 3
  }
}
