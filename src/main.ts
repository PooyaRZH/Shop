import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  // way 2 to run global middleware (way 1 in app.module.ts)
  app.use(new LoggerMiddleware().use)

  await app.listen(process.env.PORT ?? 6010);
}
bootstrap();
