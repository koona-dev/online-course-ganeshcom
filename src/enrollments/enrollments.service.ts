import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { QueryResult } from 'pg';

import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { enrollments, EnrollmentsType } from './schemas/enrollment.schema';
import {
  queryDeleteFilter,
  queryFilter,
  queryUpdateFilter,
} from 'src/common/utils/query-filter';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly enrollmentsRepository: NodePgDatabase<EnrollmentsType>,
  ) {}

  async create(body: { [field: string]: any }): Promise<EnrollmentsType> {
    const enrollmentData = {
      userId: body.userId,
      courseId: body.courseId,
      orderId: body.orderId,
    };
    const savedCourse = await this.enrollmentsRepository
      .insert(enrollments)
      .values(enrollmentData)
      .returning();

    return savedCourse[0];
  }

  async findMany(
    dataFilter?: { [field: string]: any },
    options?: {
      mode?: 'and' | 'or';
    },
  ): Promise<EnrollmentsType[]> {
    const query = this.enrollmentsRepository.select().from(enrollments);

    if (dataFilter) {
      return await queryFilter<EnrollmentsType>(
        query,
        enrollments,
        dataFilter,
        options,
      );
    }
    return query;
  }

  async findOne(
    dataFilter: { [field: string]: any },
    options?: {
      mode?: 'and' | 'or';
    },
  ): Promise<EnrollmentsType> {
    const query = this.enrollmentsRepository.select().from(enrollments);
    let results: EnrollmentsType[] = [];

    results = await queryFilter<EnrollmentsType>(
      query,
      enrollments,
      dataFilter,
      options,
    );

    return results[0];
  }

  async update(
    updateEnrollmentsDto: UpdateEnrollmentDto,
    dataFilter: { [field: string]: any },
    options?: {
      mode?: 'and' | 'or';
    },
  ): Promise<EnrollmentsType> {
    let results: EnrollmentsType[] = [];
    const updatedCourse = this.enrollmentsRepository
      .update(enrollments)
      .set(updateEnrollmentsDto);

    results = await queryUpdateFilter<EnrollmentsType>(
      updatedCourse,
      enrollments,
      dataFilter,
      options,
    );

    return results[0];
  }

  async remove(
    dataFilter: { [field: string]: any },
    options?: {
      mode?: 'and' | 'or';
    },
  ): Promise<QueryResult<never>> {
    const deletedEnrollment = this.enrollmentsRepository.delete(enrollments);

    return await queryDeleteFilter<EnrollmentsType>(
      deletedEnrollment,
      enrollments,
      dataFilter,
      options,
    );
  }
}
