import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class AddProductToBasketDto {

    @IsNotEmpty()
    product_id!: number

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity!: number
}