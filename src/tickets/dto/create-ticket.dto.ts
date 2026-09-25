import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateTicketDto {

    @IsNotEmpty()
    // @IsString()
    @IsNumber()
    user_id!: number

    // @IsString()
    @IsNumber()
    @IsOptional()
    main_ticket_id!: number

    @IsNotEmpty()
    @IsString()
    title!: string

    @IsNotEmpty()
    @IsString()
    description!: string

}
