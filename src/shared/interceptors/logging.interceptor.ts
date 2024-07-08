import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrometheusService } from '../services/prometheus.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly prometheusService: PrometheusService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log('route:', request.route.path);
        console.log('execution time:', Date.now() - now);
        const duration = Date.now() - now;
        this.prometheusService.SendMetrics.labels(request.route.path).observe(
          duration / 1000,
        );
      }),
    );
  }
}
