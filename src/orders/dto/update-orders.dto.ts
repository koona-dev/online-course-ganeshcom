import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly studentId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly totalPrice: number;

  @IsString()
  @IsNotEmpty()
  readonly orderStatus: string;
}
