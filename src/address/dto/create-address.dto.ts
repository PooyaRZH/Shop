import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateAddressDto {

    @IsNotEmpty()
    user_id!: number

    @IsNotEmpty()
    @IsString()
    province!: string

    @IsNotEmpty()
    @IsString()
    city!: string

    @IsNotEmpty()
    @IsString()
    address!: string

    @IsNotEmpty()
    @IsString()
    // @Length(10, 10)
    postal_code!: string

    @IsNotEmpty()
    @IsString()
    // @Length(11, 11)
    receiver_mobile!: string

    @IsString()
    @IsOptional()
    display_name?: string









}
