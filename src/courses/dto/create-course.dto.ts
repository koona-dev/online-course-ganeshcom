import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  MaxLength,
} from 'class-validator';

import CourseCategory from '../constants/course-category.constant';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsEnum(CourseCategory)
  readonly category: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;

  @IsNotEmpty()
  @IsNumber()
  readonly discount: number;
}
