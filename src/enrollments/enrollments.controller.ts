import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';

import { EnrollmentsService } from './enrollments.service';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-guard';
import { StudentJwtGuard } from 'src/auth/jwt/student-jwt-guard';
import { AdminJwtGuard } from 'src/auth/jwt/admin-jwt-guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get(':studentId')
  @UseGuards(JwtAuthGuard, StudentJwtGuard)
  findMany(
    @Param(
      'studentId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    studentId: number,
  ) {
    const filter = {
      studentId: studentId,
    };

    return this.enrollmentsService.findMany(filter);
  }

  @Get(':enrollmentId')
  @UseGuards(JwtAuthGuard, StudentJwtGuard)
  findOne(
    @Param(
      'enrollmentId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    enrollmentId: number,
  ) {
    return this.enrollmentsService.findOne(enrollmentId);
  }

  @Patch(':enrollmentId')
  @UseGuards(JwtAuthGuard, AdminJwtGuard)
  update(
    @Param('enrollmentId', ParseIntPipe) enrollmentId: number,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentsService.update(enrollmentId, updateEnrollmentDto);
  }

  @Delete(':enrollmentId')
  @UseGuards(JwtAuthGuard, AdminJwtGuard)
  remove(@Param('enrollmentId', ParseIntPipe) enrollmentId: number) {
    return this.enrollmentsService.remove(enrollmentId);
  }
}
