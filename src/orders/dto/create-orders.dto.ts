import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  readonly courseId: number;
}
