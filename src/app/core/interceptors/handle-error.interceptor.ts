import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private loggerService: LoggerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: unknown) => {
        return this.loggerService.error(`Request to "${request.url}" failed`).pipe(
          switchMap(() => {
            return throwError(() => error);
          })
        );
      })
    );
  }
}
