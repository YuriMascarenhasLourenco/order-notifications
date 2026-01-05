import { Controller, Inject } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, PAYMENT_SERVICE } from '../constant';
import { NOTIFICATION_MESSAGE, PAYMENT_MESSAGE } from 'constant';
import { ORDER_CREATED_V1 } from '@lib/events';
import type {
  NotificationSendV1,
  OrderCreatedV1,
  PaymentProcessV1,
} from '@lib/events';
import { randomUUID } from 'crypto';

@Controller()
export class OrderServiceController {
  constructor(
    private readonly orderServiceService: OrderServiceService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationRMQClient: ClientProxy,
    @Inject(PAYMENT_SERVICE) private readonly paymentRMQClient: ClientProxy,
  ) {}

  @EventPattern(ORDER_CREATED_V1)
  handleOrderCreated(@Payload() order: OrderCreatedV1) {
    console.log('Order Created Event Received:', order);
    const newNotification: NotificationSendV1 = {
      eventId: randomUUID(),
      occurredAt: new Date().toISOString(),
      payload: {
        name: order.payload.name,
        price: order.payload.price,
        quantity: order.payload.quantity,
        message: 'Order successfully created',
      },
    };
    const newPayment: PaymentProcessV1 = {
      eventId: randomUUID(),
      occurredAt: new Date().toISOString(),
      payload: {
        name: order.payload.name,
        quantity: order.payload.quantity,
        price: order.payload.price,
      },
    };
    this.paymentRMQClient.emit(PAYMENT_MESSAGE, newPayment);

    this.paymentRMQClient.emit(PAYMENT_MESSAGE, order);
    this.notificationRMQClient.emit(NOTIFICATION_MESSAGE, newNotification);
  }
}
