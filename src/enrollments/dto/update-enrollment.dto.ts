import { IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';
import { CourseStatus } from '../constants/course-status';

export class UpdateEnrollmentDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly alreadyPurchased: boolean;

  @IsNotEmpty()
  @IsEnum(CourseStatus)
  readonly courseStatus: string;
}
