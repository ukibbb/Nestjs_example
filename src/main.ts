import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

function configureNestApp(app: INestApplication): INestApplication {
  app.setGlobalPrefix('/v1/api');
  return app;
}

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app = configureNestApp(app);
  await app.listen(3000);
}
bootstrap();
