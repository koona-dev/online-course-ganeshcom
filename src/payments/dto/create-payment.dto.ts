import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  readonly orderId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly totalPrice: number;

  @IsNotEmpty()
  @IsString()
  readonly paymentMethod: string;

  @IsNotEmpty()
  @IsString()
  readonly paymentStatus: string;
}
