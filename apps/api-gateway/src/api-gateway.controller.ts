import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ORDER_SERVICE } from '../constant';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_MESSAGE } from 'constant';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject(ORDER_SERVICE) private readonly RMQOrderClient: ClientProxy,
  ) {}
  @Post('order')
  createOrder(@Body() orderData: any) {
    this.RMQOrderClient.emit(ORDER_MESSAGE, orderData);
    return { message: 'Order creation request sent.' };
  }
}
