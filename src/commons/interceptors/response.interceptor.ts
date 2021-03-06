import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  statusCode: number;
  data?: T;
  message?: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((response) => {
        // const res = context.switchToHttp().getResponse();
        // res.status(response.statusCode);
        return {
          statusCode: response?.statusCode || context.switchToHttp().getResponse().statusCode,
          data: response?.data || response,
          message: response?.message,
        };
      }),
    );
  }
}
