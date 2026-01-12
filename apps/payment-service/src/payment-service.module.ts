import { Module } from '@nestjs/common';
import { PaymentServiceController } from './payment-service.controller';
import { PaymentServiceService } from './payment-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'), // raiz
        join(process.cwd(), 'apps/payment-service/.env.payment'), // específico
      ],
    }),
  ],
  controllers: [PaymentServiceController],
  providers: [
    PaymentServiceService,
    {
      provide: 'STRIPE_API_KEY',
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
      inject: [ConfigService],
    },
  ],
})
export class PaymentServiceModule {}
