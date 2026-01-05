import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_DEFAULTS } from '../options/rmq-options';

export function createRmqMicroserviceOptions(
  queue: string,
): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue,
      queueOptions: RMQ_DEFAULTS.queueOptions,
      noAck: RMQ_DEFAULTS.noAck,
      prefetchCount: RMQ_DEFAULTS.prefetchCount,
    },
  };
}
