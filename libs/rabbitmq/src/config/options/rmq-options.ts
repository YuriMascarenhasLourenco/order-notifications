export const RMQ_DEFAULTS = {
  noAck: false,
  prefetchCount: 10,
  queueOptions: { durable: true },
} as const;
