import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class RegisterDto {
    // @IsNotEmpty()
    @IsString()
    // @Length(11, 11)
    // @Transform((value) => { value.trim() })
    @ApiPropertyOptional({ example: '09', description: "شماره موبایل" })
    mobile!: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    @ApiProperty({ example: 'TEST', description: "نام کاربری" })
    username!: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    @ApiProperty({ example: 'TEST', description: "رمز عبور" })
    password!: string;


}