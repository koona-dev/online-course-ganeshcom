import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-guard';
import { StudentJwtGuard } from 'src/auth/jwt/student-jwt-guard';
import { AdminJwtGuard } from 'src/auth/jwt/admin-jwt-guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, StudentJwtGuard)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminJwtGuard)
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':paymentId')
  @UseGuards(JwtAuthGuard, StudentJwtGuard)
  findOne(
    @Param(
      'paymentId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    paymentId: number,
  ) {
    return this.paymentsService.findOne(paymentId);
  }

  @Patch(':paymentId')
  @UseGuards(JwtAuthGuard, AdminJwtGuard)
  update(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(paymentId, updatePaymentDto);
  }

  @Delete(':paymentId')
  @UseGuards(JwtAuthGuard, AdminJwtGuard)
  remove(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.paymentsService.remove(paymentId);
  }
}
