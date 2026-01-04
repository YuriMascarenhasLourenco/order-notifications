import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NOTIFICATION_QUEUE } from 'constant';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const config = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [config.getOrThrow<string>('RABBITMQ_URL')],
        queue: NOTIFICATION_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  Logger.log('Notifications microservice is listening on RabbitMQ...');

  await appContext.close();
}
bootstrap().catch((error) => {
  Logger.error('Error starting notifications microservice', error);
});
