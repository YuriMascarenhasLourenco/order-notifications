import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_DEFAULTS } from '../options/rmq-options';
import { ConfigService } from '@nestjs/config';

export function createRmqMicroserviceOptions(
  queue: string,
): MicroserviceOptions {
  const config = new ConfigService();
  const url = config.getOrThrow<string>('RABBITMQ_URL');
  if (!url) {
    throw new Error('RABBITMQ_URL is not defined');
  }

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      queueOptions: RMQ_DEFAULTS.queueOptions,
      noAck: RMQ_DEFAULTS.noAck,
      prefetchCount: RMQ_DEFAULTS.prefetchCount,
    },
  };
}
