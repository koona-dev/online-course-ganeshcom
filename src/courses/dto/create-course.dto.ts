import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  MaxLength,
  IsDecimal,
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
  @IsDecimal()
  readonly rating: number;

  @IsNotEmpty()
  @IsDecimal()
  readonly discount: number;
}
