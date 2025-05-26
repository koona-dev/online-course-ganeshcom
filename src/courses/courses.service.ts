import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { courses, CoursesType } from './schemas/courses.schema';
import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { QueryResult } from 'pg';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly coursesRepository: NodePgDatabase<CoursesType>,
  ) {}

  async create(
    userId: number,
    createCourseDto: CreateCourseDto,
  ): Promise<CoursesType> {
    const savedCourse = await this.coursesRepository
      .insert(courses)
      .values({ ...createCourseDto, instructorId: userId })
      .returning();

    return savedCourse[0];
  }

  async findAll(): Promise<CoursesType[]> {
    const courseData = await this.coursesRepository.select().from(courses);
    return courseData;
  }

  async findOne(courseId: number): Promise<CoursesType> {
    const course = await this.coursesRepository
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    return course[0];
  }
  async update(
    courseId: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CoursesType> {
    const updatedCourse = await this.coursesRepository
      .update(courses)
      .set(updateCourseDto)
      .where(eq(courses.id, courseId))
      .returning();

    return updatedCourse[0];
  }

  async remove(courseId: number): Promise<QueryResult<never>> {
    const deletedCourse = await this.coursesRepository
      .delete(courses)
      .where(eq(courses.id, courseId));

    return deletedCourse;
  }
}
