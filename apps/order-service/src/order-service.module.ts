import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { QUEUES, RMQClients } from '@lib/events';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { OrderEntity } from './entities/orderRepository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), 'apps/order-service/.env.order'),
      ],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: config.getOrThrow<number>('DB_PORT'),
        username: config.getOrThrow<string>('DB_USERNAME'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_DATABASE'),
        entities: [OrderEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([OrderEntity]),

    ClientsModule.registerAsync([
      {
        name: RMQClients.NOTIFICATION_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RABBITMQ_URL')],
            queue: QUEUES.NOTIFICATION,
            queueOptions: { durable: true },
            noAck: true,
          },
        }),
      },
      {
        name: RMQClients.PAYMENT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RABBITMQ_URL')],
            queue: QUEUES.PAYMENT,
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
