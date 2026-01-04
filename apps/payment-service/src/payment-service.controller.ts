import { Controller } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { EventPattern } from '@nestjs/microservices';
import { PAYMENT_MESSAGE } from 'constant';

@Controller()
export class PaymentServiceController {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}
  @EventPattern(PAYMENT_MESSAGE)
  handleProcessPayment(order: any) {
    console.log('Process Payment Event Received:', order);
    // Lógica para processar o pagamento (e.g., integração com gateway de pagamento)
  }
}
