import { Controller, Inject } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, PAYMENT_SERVICE } from '../constant';
import { NOTIFICATION_MESSAGE, ORDER_MESSAGE, PAYMENT_MESSAGE } from 'constant';

@Controller()
export class OrderServiceController {
  constructor(
    private readonly orderServiceService: OrderServiceService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationRMQClient: ClientProxy,
    @Inject(PAYMENT_SERVICE) private readonly paymentRMQClient: ClientProxy,
  ) {}

  @EventPattern(ORDER_MESSAGE)
  handleOrderCreated(@Payload() order: any) {
    console.log('Order Created Event Received:', order);
    this.paymentRMQClient.emit(PAYMENT_MESSAGE, order);
    this.notificationRMQClient.emit(NOTIFICATION_MESSAGE, order);
  }
}
