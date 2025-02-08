import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/* 
  Example how to use interceptor in Aspect Oriented Programming. Example binding
  interceptors.
*/

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Intercept before...');
    const now = Date.now();

    // always need to call handle to continue on response stream
    // rxjs map()
    return next
      .handle()
      .pipe(tap(() => console.log(`Intercept after... ${Date.now() - now}ms`)));
  }
}
