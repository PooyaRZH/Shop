import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  // way 2 to run global middleware (way 1 in app.module.ts)
  app.use(new LoggerMiddleware().use)


  // swagger config
  const config = new DocumentBuilder()
    .setTitle("API SHOP1")
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)




  await app.listen(process.env.PORT ?? 6010);
}
bootstrap();
