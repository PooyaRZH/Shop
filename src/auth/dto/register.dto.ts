import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class RegisterDto {
    // @IsNotEmpty()
    @IsString()
    // @Length(11, 11)
    // @Transform((value) => { value.trim() })
    mobile!: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    username!: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password!: string;


}