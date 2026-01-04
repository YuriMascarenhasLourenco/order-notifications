import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PAYMENT_QUEUE } from 'constant';
import { PaymentServiceModule } from './payment-service.module';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(PaymentServiceModule);
  const config = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [config.getOrThrow<string>('RABBITMQ_URL')],
        queue: PAYMENT_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  Logger.log('Payment microservice is listening on RabbitMQ...');

  await appContext.close();
}
bootstrap().catch((error) => {
  Logger.error('Error starting payment microservice', error);
});
