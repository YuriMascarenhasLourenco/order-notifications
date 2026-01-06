import type { NotificationSendV1 } from '@lib/events';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  sendNotification(notification: NotificationSendV1): Promise<void> {
    return Promise.resolve();
  }
}
