import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

// Example stream overriding. In a realistic example, we'd want to consider
// other factors like TTL, cache invalidation, cache size, etc., but that's
// beyond the scope of this discussion
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const isCached = true;
    if (isCached) {
      // return the new rxjs stream of cache here therefore the handler should
      // not be called, combine with custom decorator to make selected endpoint
      // should use caching data
      return of([]);
    }
    return next.handle();
  }
}
