import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { OrderServiceModule } from 'apps/order-service/src/order-service.module';
import { createRmqMicroserviceOptions } from 'rabbitmq/rabbitmq/config/microservice/create-microservice';
import { QUEUES } from '@lib/events';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    createRmqMicroserviceOptions(QUEUES.ORDER),
  );

  await app.listen();
  Logger.log('order microservice is listening on RabbitMQ...');
}
bootstrap().catch((error) => {
  Logger.error('Error starting order microservice', error);
});
