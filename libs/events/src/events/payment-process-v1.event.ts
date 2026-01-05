export const PAYMENT_PROCESS_V1 = 'payment.process.v1' as const;

export type PaymentProcessV1 = {
  eventId: string;
  occurredAt: string;
  payload: {
    name: string;
    quantity: number;
    price: number;
  };
};
