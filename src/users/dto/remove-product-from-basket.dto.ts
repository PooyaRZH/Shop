import { IsNotEmpty } from "class-validator";

export class RemoveProductFromBasket {
    @IsNotEmpty()
    product_id!: number
}