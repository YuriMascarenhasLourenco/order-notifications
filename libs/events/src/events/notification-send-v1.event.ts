export const NOTIFICATION_SEND_V1 = 'notification.send.v1' as const;

export type NotificationSendV1 = {
  eventId: string;
  occurredAt: string;
  payload: {
    name: string;
    quantity: number;
    price: number;
    message?: string;
  };
};
