import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { QueryResult } from 'pg';

import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { enrollments, EnrollmentsType } from './schemas/enrollment.schema';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import queryFilter from 'src/common/utils/query-filter';

@Injectable()
export class EnrollmentsService {
  constructor(
    @Inject(DatabaseAsyncProvider)
    private readonly enrollmentsRepository: NodePgDatabase<EnrollmentsType>,
  ) {}

  async create(
    createEnrollmentsDto: CreateEnrollmentDto,
  ): Promise<EnrollmentsType> {
    const savedCourse = await this.enrollmentsRepository
      .insert(enrollments)
      .values(createEnrollmentsDto)
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

  async findOne(enrollmentId: number): Promise<EnrollmentsType> {
    const enrollment = await this.enrollmentsRepository
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, enrollmentId))
      .limit(1);

    return enrollment[0];
  }

  async update(
    enrollmentId: number,
    updateEnrollmentsDto: UpdateEnrollmentDto,
  ): Promise<EnrollmentsType> {
    const updatedCourse = await this.enrollmentsRepository
      .update(enrollments)
      .set(updateEnrollmentsDto)
      .where(eq(enrollments.id, enrollmentId))
      .returning();

    return updatedCourse[0];
  }

  async remove(enrollmentId: number): Promise<QueryResult<never>> {
    const deletedEnrollment = await this.enrollmentsRepository
      .delete(enrollments)
      .where(eq(enrollments.id, enrollmentId));

    return deletedEnrollment;
  }
}
