import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(configService: ConfigService) {
        // const secret = configService.get<string>('JWT_SECRET', { infer: true })!;

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET")!
            // secretOrKey: secret
        })
    }


    // async validate(...args: any[]): unknown {

    // }
    async validate(payload: any) {
        return { userId: payload.sub, mobile: payload.mobile, username: payload.username }
    }
}