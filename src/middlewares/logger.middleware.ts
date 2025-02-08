import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

/**
 * Example middleware
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request...');

    next();
  }
}

/**
 * Example function middleware, consider use functional if middleware not use
 * any external dependency
 */
export function loggerFunc(req: Request, res: Response, next: NextFunction) {
  console.log('Middleware via log function');
  next();
}

export function helmet(req: Request, res: Response, next: NextFunction) {
  console.log('Middleware helmet');
  next();
}
