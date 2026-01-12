import { Controller } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { EventPattern } from '@nestjs/microservices';
import { PAYMENT_PROCESS_V1, type PaymentProcessV1 } from '@lib/events';

@Controller()
export class PaymentServiceController {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}
  @EventPattern(PAYMENT_PROCESS_V1)
  async handleProcessPayment(order: PaymentProcessV1) {
    const amountInCents = order.payload.price * 100;
    console.log(`amountInCents: ${amountInCents}`);
    await this.paymentServiceService.createPaymentIntent(
      amountInCents,
      'usd',
      order.payload.quantity,
    );
  }
}
