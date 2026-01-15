import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { CreateOrderDto } from '@lib/my-library';
import { ORDER_CREATED_V1, RMQClients, type OrderCreatedV1 } from '@lib/events';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject(RMQClients.ORDER_SERVICE)
    private readonly RMQOrderClient: ClientProxy,
  ) {}
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({
    type: CreateOrderDto,
    required: true,
    description: 'Data required to create a new order',
    examples: {
      example1: {
        summary: 'Example order data',
        value: {
          name: 'Product Name',
          quantity: 10,
          price: 25.99,
        },
      },
    },
  })
  @Post('order')
  createOrder(@Body() orderData: CreateOrderDto) {
    const newOrderEvent: OrderCreatedV1 = {
      eventId: randomUUID(),
      occurredAt: new Date().toISOString(),
      payload: {
        name: orderData.name,
        quantity: orderData.quantity,
        price: orderData.price,
      },
    };
    this.RMQOrderClient.emit(ORDER_CREATED_V1, newOrderEvent);
    return { message: 'Order creation request sent.' };
  }
}
