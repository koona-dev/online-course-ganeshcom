import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import * as courseSchema from './schema/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly database: NodePgDatabase<typeof courseSchema>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const result = await this.database
      .insert(courseSchema.courses)
      .values(createCourseDto)
      .returning();

    console.log(result);
  }

  async findAll() {
    const courseData = await this.database.select().from(courseSchema.courses);
    return courseData;
  }

  async findOne(courseId: number) {
    const course = await this.database.query.courses.findFirst({
      where: eq(courseSchema.courses.id, courseId),
    });

    return course;
  }

  async update(courseId: number, updateCourseDto: UpdateCourseDto) {
    const updatedCourse = await this.database
      .update(courseSchema.courses)
      .set(updateCourseDto)
      .where(eq(courseSchema.courses.id, courseId))
      .returning();

    return updatedCourse;
  }

  async remove(courseId: number) {
    await this.database
      .delete(courseSchema.courses)
      .where(eq(courseSchema.courses.id, courseId));
  }
}
