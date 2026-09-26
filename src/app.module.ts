import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { TicketsModule } from './tickets/tickets.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { BodyLoggerMiddleware } from './middlewares/body-logger/body-logger.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsersModule, AuthModule, AddressModule, TicketsModule, ProductsModule, CategoriesModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  // way 1 to run global middlewares (way 2 in main.ts)
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, BodyLoggerMiddleware)
      .forRoutes("*")
  }





}
