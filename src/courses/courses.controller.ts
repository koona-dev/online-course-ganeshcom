import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InstructorJwtGuard } from 'src/auth/jwt/instruktur-jwt-guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(InstructorJwtGuard)
  create(@Body() createCourseDto: CreateCourseDto, @Request() request) {
    return this.coursesService.create(+request.user.userId, createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':courseId')
  findOne(
    @Param(
      'courseId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: string,
  ) {
    return this.coursesService.findOne(+courseId);
  }

  @Patch(':courseId')
  @UseGuards(InstructorJwtGuard)
  update(
    @Param('courseId', ParseIntPipe) courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(+courseId, updateCourseDto);
  }

  @Delete(':courseId')
  @UseGuards(InstructorJwtGuard)
  remove(@Param('courseId', ParseIntPipe) courseId: string) {
    return this.coursesService.remove(+courseId);
  }
}
