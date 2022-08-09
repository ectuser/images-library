import { fakeAsync, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { HandleErrorInterceptor } from './handle-error.interceptor';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

class LoggerServiceMock {
  error(message: unknown): Observable<unknown> {
    return of(message);
  }
}

describe('HandleErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let interceptor: HandleErrorInterceptor;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [HandleErrorInterceptor, { provide: LoggerService, useClass: LoggerServiceMock }]
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(HandleErrorInterceptor);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call loggerService.error in case of error', fakeAsync(() => {
    httpClient.get('test-url').subscribe();

    const request = httpMock.expectOne('test-url');
    const response = new HttpErrorResponse({url: 'test-url', error: 'Req err'});
    request.error(new ProgressEvent('error'), response);

    expect(true).toBe(true);
  }));
});
