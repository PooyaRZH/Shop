import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'database/database.module';
import { UsersRepository } from '../repo/users.repo';
import { ProductsModule } from 'src/products/products.module';
import { LoggerMiddleware } from 'src/middlewares/logger/logger.middleware';

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes(UsersController)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.GET },

      )
  }

}
