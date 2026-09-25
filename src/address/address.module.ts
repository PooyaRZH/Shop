import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseModule } from 'database/database.module';
import { AddressRepository } from 'src/repo/address.repo';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
})
export class AddressModule { }
