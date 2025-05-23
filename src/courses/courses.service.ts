import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DatabaseAsyncProvider } from 'src/database/database.provider';
import * as CourseSchema from './schema/course.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly database: NodePgDatabase<typeof CourseSchema>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
