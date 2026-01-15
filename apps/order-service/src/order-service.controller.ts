import { Controller, Inject } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

import {
  NOTIFICATION_SEND_V1,
  ORDER_CREATED_V1,
  PAYMENT_PROCESS_V1,
  RMQClients,
} from '@lib/events';
import type {
  NotificationSendV1,
  OrderCreatedV1,
  PaymentProcessV1,
} from '@lib/events';

@Controller()
export class OrderServiceController {
  constructor(
    private readonly orderServiceService: OrderServiceService,
    @Inject(RMQClients.NOTIFICATION_SERVICE)
    private readonly notificationRMQClient: ClientProxy,
    @Inject(RMQClients.PAYMENT_SERVICE)
    private readonly paymentRMQClient: ClientProxy,
  ) {}

  @EventPattern(ORDER_CREATED_V1)
  async handleOrderCreated(@Payload() order: OrderCreatedV1) {
    console.log('Order Created Event Received:', order);
    const newNotification: NotificationSendV1 = {
      eventId: order.eventId,
      occurredAt: new Date().toISOString(),
      payload: {
        name: order.payload.name,
        price: order.payload.price,
        quantity: order.payload.quantity,
        message: 'Order successfully created. Thank you for your purchase!',
      },
    };
    const newPayment: PaymentProcessV1 = {
      eventId: order.eventId,
      occurredAt: new Date().toISOString(),
      payload: {
        name: order.payload.name,
        quantity: order.payload.quantity,
        price: order.payload.price,
      },
    };
    await this.orderServiceService.createOrder(order);
    this.paymentRMQClient.emit(PAYMENT_PROCESS_V1, newPayment);

    this.notificationRMQClient.emit(NOTIFICATION_SEND_V1, newNotification);
  }
}
