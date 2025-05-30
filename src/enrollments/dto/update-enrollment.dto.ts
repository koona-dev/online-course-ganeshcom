import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class UpdateEnrollmentDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly courseId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly orderId: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly alreadyPurchased: boolean;

  @IsNotEmpty()
  @IsString()
  readonly courseStatus: string;

  @IsNotEmpty()
  @IsDate()
  readonly enrolledAt: Date;
}
