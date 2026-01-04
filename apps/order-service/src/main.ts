import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ORDER_QUEUE } from 'constant';
import { OrderServiceModule } from 'apps/order-service/src/order-service.module';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(OrderServiceModule);
  const config = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [config.getOrThrow<string>('RABBITMQ_URL')],
        queue: ORDER_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  Logger.log('order microservice is listening on RabbitMQ...');
}
bootstrap().catch((error) => {
  Logger.error('Error starting order microservice', error);
});
