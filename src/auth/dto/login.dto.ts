import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class LoginDto {
    // @IsNotEmpty()
    @IsString()
    @Length(11, 11)
    // @Transform((value) => { value.trim() })
    mobile!: string;

    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    username!: string;

    @IsString()
    @IsNotEmpty()
    // @MinLength(8)
    password!: string;


}