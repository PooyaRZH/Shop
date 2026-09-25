import { Injectable } from "@nestjs/common";
import { DatabaseService } from "database/database.service";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { UpdateProductDto } from "src/products/dto/update-product.dto";

@Injectable()
export class ProductRepository {

    constructor(private readonly database: DatabaseService) { }





    async isExistCategory(categoryId: number) {
        const result = await this.database.query(
            `
            SELECT * FROM categories WHERE id = $1
            `, [categoryId]
        )

        return result.rows[0]
    }



    async create(dto: CreateProductDto) {
        const result = await this.database.query(
            `
            INSERT INTO products(title, price, stock, description)
            VALUES($1,$2,$3,$4) RETURNING *
            `,
            [
                dto.title,
                dto.price,
                dto.stock,
                dto.description?.trim() || null
            ]
        )
        return result.rows[0]
    }



    async createRel(productId: number, categoryId: number) {
        const result = await this.database.query(
            `
            INSERT INTO product_category(product_id,category_id)
            VALUES($1,$2) RETURNING *
            `, [productId, categoryId]
        )

        return result
    }




    async getById(id: number) {
        const result = await this.database.query(
            `
        SELECT
            products.*,
            COALESCE(
                array_agg(categories.title)
                    FILTER (WHERE categories.title IS NOT NULL),
                '{}'
            ) AS categories

        FROM products

        LEFT JOIN product_category
            ON product_category.product_id = products.id

        LEFT JOIN categories
            ON product_category.category_id = categories.id

        WHERE products.id = $1

        GROUP BY products.id
        `,
            [id]
        );

        return result.rows[0];
    }




    async getAll() {
        const result = await this.database.query(
            `
        SELECT
            products.*,
            COALESCE(
                array_agg(categories.title)
                    FILTER (WHERE categories.title IS NOT NULL),
                '{}'
            ) AS categories

        FROM products

        LEFT JOIN product_category
            ON product_category.product_id = products.id

        LEFT JOIN categories
            ON product_category.category_id = categories.id



        GROUP BY products.id
        `
        );

        return result.rows;
    }



    async removeCategories(id: number) {
        const result = await this.database.query(
            `
            DELETE FROM product_category WHERE product_id = $1 RETURNING *;
            `, [id]
        )
        return result
    }



    async update(id: number, updateProductDto: UpdateProductDto) {
        const result = await this.database.query(
            `
            UPDATE products
                SET title =  COALESCE($1, title), price =  COALESCE($2, price),
                    description =  COALESCE($3, description), stock =  COALESCE($4, stock) 
                WHERE id = $5
            `,
            [
                updateProductDto.title,
                updateProductDto.price,
                updateProductDto.description,
                updateProductDto.stock,
                id
            ]
        )
        return result
    }






    async remove(id: number) {
        const result = await this.database.query(
            `
            DELETE FROM products WHERE id = $1 RETURNING *
            `, [id]
        )

        return result.rowCount
    }









}