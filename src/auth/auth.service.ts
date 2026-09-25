import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
// import bcrypt from "bcrypt"
// import * as bcrypt from 'bcrypt';
import bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwt: JwtService
    ) { }



    async register(registerDto: RegisterDto) {
        const hashedPass = await bcrypt.hash(registerDto.password, 10)
        // console.log(hashedPass)
        return this.userService.create({ mobile: registerDto.mobile, username: registerDto.username, password: hashedPass })
    }



    async login(loginDto: LoginDto) {
        const user = await this.userService.findByMobile(loginDto.mobile)
        if (!user) throw new NotFoundException('User not found');

        const isCorrectPass = await bcrypt.compare(loginDto.password, user.password)
        if (!isCorrectPass) throw new UnauthorizedException()

        const payLoad = { mobile: user.mobile, username: user.username, sub: user.id }
        // console.log("با موفقیت وارد شدید")
        const token = this.jwt.sign(payLoad)
        return {
            accessToken: token
        }

    }






}