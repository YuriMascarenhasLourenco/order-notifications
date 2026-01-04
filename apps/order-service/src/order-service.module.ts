import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';

import { NOTIFICATION_SERVICE, PAYMENT_SERVICE } from '../constant';
import { NOTIFICATION_QUEUE, PAYMENT_QUEUE } from 'constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ClientsModule.registerAsync([
      {
        name: NOTIFICATION_SERVICE,
        imports: [ConfigModule], // garante ConfigService disponível aqui
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RABBITMQ_URL')],
            queue: NOTIFICATION_QUEUE,
            queueOptions: { durable: true },
          },
        }),
      },
      {
        name: PAYMENT_SERVICE,
        imports: [ConfigModule], // garante ConfigService disponível aqui
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RABBITMQ_URL')],
            queue: PAYMENT_QUEUE,
            queueOptions: { durable: true },
          },
        }),
      },
    ]),
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
