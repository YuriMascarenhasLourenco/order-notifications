import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
  Logger.log('API Gateway is running on http://localhost:3000');
}
bootstrap();
