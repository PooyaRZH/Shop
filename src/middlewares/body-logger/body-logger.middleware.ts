import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class BodyLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const body = req.body
    if (body) {
      console.log(body)
    } else {
      console.log("No body !")
    }
    next();
  }
}
