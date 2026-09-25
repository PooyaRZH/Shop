import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddProductToBasketDto } from './dto/add-product-to-Basket.dto';
import { RemoveProductFromBasket } from './dto/remove-product-from-basket.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }





  @Post(':id/basket')
  addToBasket(@Param('id') id: string, @Body() addProductToBasketDto: AddProductToBasketDto) {
    return this.usersService.addProductToBasket(+id, addProductToBasketDto)
  }

  // @Delete(':id/basket')
  // removeFromBasket(@Param('id') id: string, @Body() removeProductFromBasket: RemoveProductFromBasket) {
  //   return this.usersService.removeProductFromBasket(+id, removeProductFromBasket)
  // }

  @Delete(':id/basket/:productId')
  removeFromBasket(@Param('id') id: string, @Param('productId') productId: string) {
    return this.usersService.removeProductFromBasket(+id, +productId)
  }










}
