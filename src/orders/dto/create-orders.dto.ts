import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly totalAmount: number;

  @IsNotEmpty()
  @IsString()
  readonly orderMethod: string;

  @IsNotEmpty()
  @IsString()
  readonly orderStatus: string;
}
