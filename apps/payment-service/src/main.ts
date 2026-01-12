import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { createRmqMicroserviceOptions } from 'rabbitmq/rabbitmq/config/microservice/create-microservice';
import { QUEUES } from '@lib/events';
import { PaymentServiceModule } from './payment-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentServiceModule,
    createRmqMicroserviceOptions(QUEUES.PAYMENT),
  );

  await app.listen();
  Logger.log('Payment microservice is listening on RabbitMQ...');
}
bootstrap().catch((error) => {
  Logger.error('Error starting payment microservice', error);
});
