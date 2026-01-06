import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ORDER_SERVICE } from '../constant';
import { ClientProxy } from '@nestjs/microservices';


import { randomUUID } from 'crypto';
import { CreateOrderDto } from '@lib/my-library';
import { ORDER_CREATED_V1, type OrderCreatedV1 } from '@lib/events';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject(ORDER_SERVICE) private readonly RMQOrderClient: ClientProxy,
  ) {}
  @Post('order')
  async createOrder(@Body() orderData: CreateOrderDto) {
    const newOrderEvent: OrderCreatedV1 = {
      eventId: randomUUID(),
      occurredAt: new Date().toISOString(),
      payload: {
        name: orderData.name,
        quantity: orderData.quantity,
        price: orderData.price,
      },
    };
    await this.RMQOrderClient.emit(ORDER_CREATED_V1, newOrderEvent);
    return { message: 'Order creation request sent.' };
  }
}
