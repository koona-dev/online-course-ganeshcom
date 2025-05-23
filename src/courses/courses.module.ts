import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import DatabaseModule from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
