import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { HandleErrorInterceptor } from './handle-error.interceptor';
import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

class LoggerServiceMock {
  error(message: unknown): Observable<unknown> {
    return of(message);
  }
}

describe('HandleErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let loggerService: LoggerService;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HandleErrorInterceptor,
        multi: true,
      },
      { provide: LoggerService, useClass: LoggerServiceMock },
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loggerService = TestBed.inject(LoggerService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call loggerService.error if there is a error', (done) => {
    const loggerSpy = jest.spyOn(loggerService, 'error');

    httpClient.get('/log-test-url').subscribe(
      {
        error: () => {
          expect(loggerSpy).toHaveBeenCalledTimes(1);
          expect(loggerSpy).toHaveBeenCalledWith('Request to \"/log-test-url\" failed')
          done();
        }
      }
    )

    const req = httpMock.expectOne('/log-test-url');
    expect(req.request.method).toBe('GET');
    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404,
      statusText: 'Not Found'
    });
    req.error(new ProgressEvent('123'), errorResponse);
  });

  it('should call loggerService.error in case of error', (done) => {
    const loggerSpy = jest.spyOn(loggerService, 'error');

    httpClient.get('/log-test-url').subscribe(() => {
      expect(loggerSpy).toHaveBeenCalledTimes(0);

      done();
    })

    const req = httpMock.expectOne('/log-test-url');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
