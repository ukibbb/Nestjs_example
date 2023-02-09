import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

function configureNestApp(app: INestApplication) {
  app.setGlobalPrefix('/v1/api');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureNestApp(app);
  await app.listen(3000);
}
bootstrap();
