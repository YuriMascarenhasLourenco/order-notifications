export const QUEUES: {
  PAYMENT: string;
  ORDER: string;
  NOTIFICATION: string;
} = {
  PAYMENT: 'payment-queue',
  ORDER: 'order-queue',
  NOTIFICATION: 'notification-queue',
} as const;
