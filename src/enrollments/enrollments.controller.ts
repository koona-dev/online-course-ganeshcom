import {
  Controller,
  Request,
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
import { StudentJwtGuard } from 'src/auth/jwt/student-jwt-guard';
import { AdminJwtGuard } from 'src/auth/jwt/admin-jwt-guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get(':orderId')
  @UseGuards(StudentJwtGuard)
  findMany(
    @Param(
      'orderId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    orderId: number,
    @Request() request,
  ) {
    const filter = {
      orderId: orderId,
      userId: +request.user.userId,
    };

    return this.enrollmentsService.findMany(filter);
  }

  @Get(':orderId/:courseId')
  @UseGuards(StudentJwtGuard)
  findOne(
    @Param(
      'orderId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    orderId: number,
    @Param(
      'courseId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
    @Request() request,
  ) {
    const filter = {
      userId: +request.user.userId,
      orderId: orderId,
      courseId: courseId,
    };

    return this.enrollmentsService.findOne(filter);
  }

  @Patch(':orderId/:courseId')
  @UseGuards(AdminJwtGuard)
  update(
    @Param(
      'orderId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    orderId: number,
    @Param(
      'courseId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
    @Request() request,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    const filter = {
      userId: +request.user.userId,
      orderId: orderId,
      courseId: courseId,
    };

    return this.enrollmentsService.update(updateEnrollmentDto, filter);
  }

  @Delete(':orderId/:courseId')
  @UseGuards(AdminJwtGuard)
  remove(
    @Param(
      'orderId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    orderId: number,
    @Param(
      'courseId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
    @Request() request,
  ) {
    const filter = {
      userId: +request.user.userId,
      orderId: orderId,
      courseId: courseId,
    };

    return this.enrollmentsService.remove(filter);
  }
}
