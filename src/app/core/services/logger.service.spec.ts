import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { Config } from '../../../environments/config.model';
import { CONFIG_TOKEN } from '../../core/injection-tokens/config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoggerService', () => {
  let service: LoggerService;
  let httpMock: HttpTestingController;

  describe('feature disabled', () => {
    beforeEach(() => {
      const disbledFeature: Config = {
        features: { logging: false },
      } as Config;

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [{ provide: CONFIG_TOKEN, useValue: disbledFeature }],
      });
      service = TestBed.inject(LoggerService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return the same object', (done) => {
      const message = {a: 1, b: 2};

      service.error(message).subscribe((res) => {
        expect(res).toEqual({a: 1, b: 2});
        done();
      });
    });

    it('should log that feature is disabled', (done) => {
      const consoleSpy = jest.spyOn(console, 'log');

      service.error({}).subscribe(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Logging feature is turned off');
        done();
      });
    });
  });

  describe('feature enabled', () => {
    beforeEach(() => {
      const enabledFeature: Config = {
        features: { logging: true },
        apiEndpoints: {log: 'log-test-url'}
      } as Config;

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [{ provide: CONFIG_TOKEN, useValue: enabledFeature }],
      });
      service = TestBed.inject(LoggerService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should call get', (done) => {
      service.error('something').subscribe(() => {
        done();
      });

      const req = httpMock.expectOne('log-test-url');
      expect(req.request.method).toBe("GET");
      req.flush({});
    });

    it('should return passed object', (done) => {
      service.error({passedObject: true}).subscribe((res) => {
        expect(res).toEqual({passedObject: true});
        done();
      });

      const req = httpMock.expectOne('log-test-url');
      expect(req.request.method).toBe("GET");
      req.flush({});
    });
  });
});
