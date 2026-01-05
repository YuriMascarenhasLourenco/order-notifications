export const ORDER_CREATED_V1 = 'order.created.v1' as const;

export type OrderCreatedV1 = {
  eventId: string;
  occurredAt: string;
  payload: {
    name: string;
    quantity: number;
    price: number;
  };
};
