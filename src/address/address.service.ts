import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from 'src/repo/address.repo';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepo: AddressRepository) { }


  async create(createAddressDto: CreateAddressDto) {
    const newAddress = await this.addressRepo.create(createAddressDto)
    return newAddress;
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
