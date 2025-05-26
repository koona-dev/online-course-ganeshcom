import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-guard';
import { StudentJwtGuard } from 'src/auth/jwt/student-jwt-guard';
import { AdminJwtGuard } from 'src/auth/jwt/admin-jwt-guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, StudentJwtGuard)
  create(@Body() createOrdersDto: CreateOrderDto, @Request() request) {
    return this.ordersService.create(+request.user.userId, createOrdersDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminJwtGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':studentId')
  @UseGuards(JwtAuthGuard, StudentJwtGuard)
  findManyByUserId(
    @Param(
      'studentId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    studentId: number,
  ) {
    const filter = {
      studentId: studentId,
    };

    return this.ordersService.findAll(filter);
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard, StudentJwtGuard)
  findOne(
    @Param(
      'orderId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    orderId: number,
  ) {
    return this.ordersService.findOne(orderId);
  }

  @Patch(':orderId')
  @UseGuards(JwtAuthGuard, AdminJwtGuard)
  update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderId, updateOrderDto);
  }

  @Delete(':orderId')
  @UseGuards(JwtAuthGuard, AdminJwtGuard)
  remove(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.remove(orderId);
  }
}
