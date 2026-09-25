import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";


export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stock!: number;

    @IsOptional()
    @IsArray()
    categories!: number[]


}
