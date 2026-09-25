import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";
import userRoleEnum from "../enums/userRole";

export class CreateUserDto {
    // @IsNotEmpty()
    @IsString()
    @Length(11, 11)
    // @Transform((value) => { value.trim() })
    mobile!: string;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsOptional()
    // @MinLength(8)
    password!: string;

    @IsEnum(userRoleEnum)
    @IsOptional()
    role!: userRoleEnum


}
