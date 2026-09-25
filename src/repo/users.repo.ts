import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'database/database.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import userRoleEnum from '../users/enums/userRole';
import { AddProductToBasketDto } from 'src/users/dto/add-product-to-Basket.dto';
import { RemoveProductFromBasket } from 'src/users/dto/remove-product-from-basket.dto';

@Injectable()
export class UsersRepository {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }




    async findByMobile(mobile: string) {
        const result = await this.databaseService.query(
            `
        SELECT *
        FROM users
        WHERE mobile = $1
        `,
            [mobile],
        );
        // console.log("log ----------->\n", result.rowCount, "\n end of log")
        // return (result.rowCount ?? 0) > 0;
        return result.rows[0];
    }


    async create(data: {
        mobile: string;
        username: string;
        password: string;
        role?: userRoleEnum;
    }) {
        if (data.role) {
            const result = await this.databaseService.query(
                `
      INSERT INTO users (
        mobile,
        username,
        password,
        role
      )
      VALUES (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING *;
      `,
                [
                    data.mobile,
                    data.username,
                    data.password,
                    data.role,
                ],
            );

            return result.rows[0];
        }

        const result = await this.databaseService.query(
            `
    INSERT INTO users (
      mobile,
      username,
      password
    )
    VALUES (
      $1,
      $2,
      $3
    )
    RETURNING *;
    `,
            [
                data.mobile,
                data.username,
                data.password,
            ],
        );

        return result.rows[0];
    }



    // async create(createUserDto: CreateUserDto) {
    //     const isValid = await this.databaseService.query(
    //         `
    //         SELECT id FROM users WHERE mobile = $1
    //         `, [createUserDto.mobile]
    //     )
    //     // console.log(isValid)
    //     if (isValid.rowCount) throw new ConflictException()

    //     const result = await this.databaseService.query(
    //         `
    //         INSERT INTO users(mobile,username,password) VALUES($1,$2,$3) RETURNING *;
    //         `,
    //         [
    //             createUserDto.mobile,
    //             createUserDto.username,
    //             createUserDto.password
    //         ]
    //     )
    //     return result;
    // }



    async getAll() {
        const result = await this.databaseService.query(
            `
            SELECT * FROM users
            `
        )
        return result.rows
    }



    async getOne(id: number) {
        const result = await this.databaseService.query(
            `
            SELECT * FROM users WHERE id = $1
            `, [id]
        )
        return result.rows[0]
    }



    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const result = await this.databaseService.query(
            `
            UPDATE users
            SET
                username = COALESCE($1, username),
                password = COALESCE($2, password)
            WHERE id = $3
            RETURNING *;
            `,
            [
                updateUserDto.username ?? null,
                updateUserDto.password ?? null,
                id
            ]
        )
        return result.rows[0]
    }



    async remove(id: number) {
        const result = await this.databaseService.query(
            `
            DELETE FROM users WHERE id = $1 RETURNING *
            `, [id]
        )
        return result.rows[0]
    }






    async addProductToBasket(userId: number, dto: AddProductToBasketDto,) {
        try {
            const result = await this.databaseService.query(
                `
            INSERT INTO basket_items (
                user_id,
                product_id,
                quantity
            )
            VALUES ($1, $2, $3)

            ON CONFLICT (user_id, product_id)
            DO UPDATE SET
                quantity = basket_items.quantity + EXCLUDED.quantity

            RETURNING *
            `,
                [
                    userId,
                    dto.product_id,
                    dto.quantity,
                ],
            );

            return result.rows[0];

        } catch (error) {
            console.log("LOG ------>\n\n", error)
            if (error.constraint === 'fk_basket_user') {
                throw new NotFoundException('User not found');
            }

            if (error.constraint === 'fk_basket_product') {
                throw new NotFoundException('Product not found');
            }

            throw error;
        }
    }



    async removeFromBasket(userId: number, productId: number) {

        const result = await this.databaseService.query(
            `
            DELETE FROM basket_items WHERE product_id = $1 AND user_id = $2
            `, [productId, userId]
        )

        return result.rowCount

    }






}