import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OrderCreatedV1 } from '@lib/events';

@Injectable()
export class AppService {
  constructor(private readonly mailer: MailerService) {}

  async sendNotification(order: OrderCreatedV1): Promise<void> {
    try {
      const mail = await this.mailer.sendMail({
        to: 'mascarenhasyuri3@gmail.com',
        subject: `Seu pedido, ${order.eventId} está sendo processado!`,
        template: './welcome',
        context: { order },
      });
      console.log(`Notification email sent: ${mail}`);
    } catch (error) {
      console.error('Error sending notification email:', error);
    }
  }
}
