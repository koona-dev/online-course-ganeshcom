import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AdminJwtGuard } from 'src/auth/jwt/admin-jwt-guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AdminJwtGuard)
  create(@Body() createCourseDto: CreateCourseDto) {
    console.log('Received body:', createCourseDto);
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':courseId')
  findOne(@Param('courseId') courseId: string) {
    return this.coursesService.findOne(+courseId);
  }

  @Patch(':courseId')
  @UseGuards(AdminJwtGuard)
  update(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(+courseId, updateCourseDto);
  }

  @Delete(':courseId')
  @UseGuards(AdminJwtGuard)
  remove(@Param('courseId') courseId: string) {
    return this.coursesService.remove(+courseId);
  }
}
