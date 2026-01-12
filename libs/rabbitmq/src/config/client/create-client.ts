import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RMQ_DEFAULTS } from '../options/rmq-options';
import { ConfigService } from '@nestjs/config';

export function createRmqClient(config: ConfigService, queue: string) {
  return ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: [config.getOrThrow<string>('RABBITMQ_URL')],
      queue,
      queueOptions: RMQ_DEFAULTS.queueOptions,
    },
  });
}
