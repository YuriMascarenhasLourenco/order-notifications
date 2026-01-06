import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { NOTIFICATION_SEND_V1, type NotificationSendV1 } from '@lib/events';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(NOTIFICATION_SEND_V1)
 async handleSendNotification(order: NotificationSendV1) {
    console.log('Notification Event Received:', order);
    // Lógica para enviar notificação (e.g., email, SMS, etc.)
    await this.appService.sendNotification(order);
  }
}
