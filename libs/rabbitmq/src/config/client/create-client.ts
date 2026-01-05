import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RMQ_DEFAULTS } from '../options/rmq-options';

export function createRmqClient(queue: string) {
  return ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue,
      queueOptions: RMQ_DEFAULTS.queueOptions,
    },
  });
}
