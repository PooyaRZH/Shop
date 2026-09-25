import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {

    @IsNotEmpty()
    user_id!: number;

    @IsNotEmpty()
    address_id!: number;
}
