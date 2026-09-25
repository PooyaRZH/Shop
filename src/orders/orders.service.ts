import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from 'src/repo/orders.repo';

@Injectable()
export class OrdersService {

  constructor(private readonly orderRepo: OrdersRepository) { }


  async create(createOrderDto: CreateOrderDto) {
    const isValidAddress = await this.orderRepo.isValidAddress(createOrderDto)
    if (!isValidAddress) throw new NotFoundException("آدرس متعلق به این کاربر نیست.")

    const products = await this.orderRepo.getProductsFromBasket(createOrderDto)
    if (products.length < 1) throw new NotFoundException("محصولی یافت نشد")
    // console.log(products)


    let totalPrice: number = 0;
    for (let p of products) {
      const data = await this.orderRepo.getProductPrice(p.product_id, p.quantity)
      // console.log(data)
      totalPrice += Number(data.product.price) * data.quantity
    }
    // console.log(totalPrice)

    const order = await this.orderRepo.createOrder(createOrderDto, totalPrice)
    // console.log(order)

    for (let p of products) {
      const data = await this.orderRepo.getProductPrice(p.product_id, p.quantity)
      await this.orderRepo.createOrderItems(data.product.id, data.product.price, data.quantity, order.id)
    }

    // const removeBasket 
    await this.orderRepo.clearBasket(createOrderDto.user_id)

  }



  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
