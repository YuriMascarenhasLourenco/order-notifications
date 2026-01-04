import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { NOTIFICATION_MESSAGE } from 'constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(NOTIFICATION_MESSAGE)
  handleSendNotification(order: any) {
    console.log('Notification Event Received:', order);
    // Lógica para enviar notificação (e.g., email, SMS, etc.)
  }
}
