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
import { StudentJwtGuard } from 'src/auth/jwt/student-jwt-guard';
import { AdminJwtGuard } from 'src/auth/jwt/admin-jwt-guard';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { CoursesService } from 'src/courses/courses.service';
import { OrderStatus } from './constants/order-status';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly enrollmentService: EnrollmentsService,
    private readonly courseService: CoursesService,
  ) {}

  @Post('add-cart')
  @UseGuards(StudentJwtGuard)
  async create(@Request() request, @Body() createOrdersDto: CreateOrderDto) {
    const filter = {
      studentId: request.studentId,
      OrderStatus: !OrderStatus.PAID_OFF,
    };

    let order = await this.ordersService.findOne(filter);

    if (!order) {
      order = await this.ordersService.create(+request.user.userId);
    }

    const addEnrollment = await this.enrollmentService.create({
      userId: request.user.userId,
      courseId: createOrdersDto.courseId,
      orderId: order.id,
    });

    const getCourses = await this.courseService.findOne(addEnrollment.courseId);

    const updateOrderDto: UpdateOrderDto = {
      studentId: +request.user.userId,
      quantity: order.quantity!++,
      totalPrice: order.totalPrice! + getCourses.price,
      orderStatus: 'pending',
    };

    await this.ordersService.update(+request.user.userId, updateOrderDto);

    return {
      message: 'Order created successfully',
      data: { order: order, enrollments: [addEnrollment] },
    };
  }

  @Get()
  @UseGuards(AdminJwtGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':studentId')
  @UseGuards(StudentJwtGuard)
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
  @UseGuards(StudentJwtGuard)
  findOne(
    @Param(
      'orderId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    orderId: number,
  ) {
    return this.ordersService.findOne({
      id: orderId,
    });
  }

  @Patch(':orderId')
  @UseGuards(AdminJwtGuard)
  update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderId, updateOrderDto);
  }

  @Delete(':orderId')
  @UseGuards(AdminJwtGuard)
  remove(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.remove(orderId);
  }
}
