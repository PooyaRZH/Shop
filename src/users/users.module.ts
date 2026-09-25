import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'database/database.module';
import { UsersRepository } from '../repo/users.repo';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule { }
