import { Injectable } from "@nestjs/common";
import { DatabaseService } from "database/database.service";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";


@Injectable()
export class OrdersRepository {
    constructor(private readonly databaseService: DatabaseService) { }


    async isValidAddress(createOrderDto: CreateOrderDto) {
        const result = await this.databaseService.query(
            `
            SELECT * FROM addresses WHERE id = $1 AND user_id = $2
            `, [createOrderDto.address_id, createOrderDto.user_id]
        )
        return result.rowCount
    }



    async getProductsFromBasket(createOrderDto: CreateOrderDto) {
        const result = await this.databaseService.query(
            `
            SELECT * FROM basket_items where user_id = $1
            `, [createOrderDto.user_id]
        )
        return result.rows
    }


    async getProductPrice(product_id: number, quantity: number) {
        const result = await this.databaseService.query(
            `
            SELECT * FROM products WHERE id = $1
            `, [product_id]
        )

        return {
            product: result.rows[0],
            quantity: quantity
        }
    }


    async createOrder(dto: CreateOrderDto, totalPrice: number) {
        const result = await this.databaseService.query(
            `
            INSERT INTO orders(user_id, address_id, total_price)
                VALUES($1,$2,$3) RETURNING *
            `,
            [
                dto.user_id,
                dto.address_id,
                totalPrice
            ]
        )

        return result.rows[0]

    }


    async createOrderItems(
        product_id: number,
        price: number,
        quantity: number,
        order_id: number
    ) {
        const result = await this.databaseService.query(
            `
            INSERT INTO order_items(product_id, price, quantity, order_id)
                VALUES($1,$2,$3,$4) RETURNING *
            `,
            [
                product_id,
                price,
                quantity,
                order_id
            ]
        )

        return result
    }





    async clearBasket(user_id: number) {
        const result = await this.databaseService.query(
            `
            DELETE FROM basket_items WHERE user_id = $1
            `, [user_id]
        )

        return result
    }










}