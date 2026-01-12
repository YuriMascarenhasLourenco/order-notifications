import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { createRmqMicroserviceOptions } from 'rabbitmq/rabbitmq/config/microservice/create-microservice';
import { QUEUES } from '@lib/events';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    createRmqMicroserviceOptions(QUEUES.NOTIFICATION),
  );

  await app.listen();
  Logger.log('Notifications microservice is listening on RabbitMQ...');
}
bootstrap().catch((error) => {
  Logger.error('Error starting notifications microservice', error);
});
