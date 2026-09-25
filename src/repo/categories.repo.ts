import { Injectable } from "@nestjs/common";
import { DatabaseService } from "database/database.service";
import { CreateCategoryDto } from "src/categories/dto/create-category.dto";

@Injectable()
export class CategoryRepository {

    constructor(private readonly database: DatabaseService) { }


    async create(dto: CreateCategoryDto) {
        const result = await this.database.query(
            `
            INSERT INTO categories(title) VALUES($1) RETURNING *;
            `, [dto.title]
        )
        return result.rows[0]
    }




    async getAll() {
        const result = await this.database.query(
            `
            SELECT * FROM categories
            `
        )
        return result.rows
    }



}