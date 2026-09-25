import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from '../repo/users.repo';
import userRoleEnum from './enums/userRole';
import { AddProductToBasketDto } from './dto/add-product-to-Basket.dto';
import { ProductsService } from 'src/products/products.service';
import { RemoveProductFromBasket } from './dto/remove-product-from-basket.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepo: UsersRepository,
    private readonly productService: ProductsService
  ) { }


  async findByMobile(mobile: string) {
    return await this.userRepo.findByMobile(mobile);
  }



  async create(data: {
    mobile: string;
    username: string;
    password: string;
    role?: userRoleEnum
  }) {
    // const exists = await this.userRepo.findByMobile(
    //   // createUserDto.mobile,
    //   data.mobile
    // );
    const user = await this.findByMobile(data.mobile)
    if (user) {
      throw new ConflictException('Mobile already exists');
    }

    return this.userRepo.create(data);
  }




  findAll() {
    return this.userRepo.getAll()
  }


  async findOne(id: number) {
    const user = await this.userRepo.getOne(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.updateUser(id, updateUserDto);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }


  async remove(id: number) {
    const removeUser = await this.userRepo.remove(id)
    if (!removeUser) throw new NotFoundException('User not found');
    return removeUser;
  }








  async addProductToBasket(id: number, addProductToBasketDto: AddProductToBasketDto) {
    // dar query check mishe - نیاز نیست
    // const user = await this.findOne(id)
    // const product = await this.productService.findOne(addProductToBasketDto.product_id)

    return this.userRepo.addProductToBasket(id, addProductToBasketDto)

  }



  async removeProductFromBasket(id: number, productId: number) {
    const isRemovedProduct = await this.userRepo.removeFromBasket(id, productId)
    if (!isRemovedProduct) throw new NotFoundException("User or product not found !")

    return "deleted successfully"
  }





}
