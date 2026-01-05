export type MessageMeta = {
  correlationId: string;
  sentAt: string; // ISO
  source: string; // ex: 'api-gateway'
};

export type Envelope<T> = {
  meta: MessageMeta;
  data: T;
};
