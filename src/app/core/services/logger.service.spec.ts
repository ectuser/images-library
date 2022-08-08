import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { Config } from '../../../environments/config.model';
import { CONFIG_TOKEN } from '../../core/injection-tokens/config';

describe('LoggerService', () => {
  let service: LoggerService;

  describe('feature disabled', () => {
    beforeEach(() => {
      const disbledFeature: Config = {
        features: { logging: false },
      } as Config;

      TestBed.configureTestingModule({
        providers: [{ provide: CONFIG_TOKEN, useValue: disbledFeature }],
      });
      service = TestBed.inject(LoggerService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return empty observable', (done) => {
      service.error('123').subscribe((res) => {
        console.log(res);
        done();
      });
    });

    it('should log ')
  });

});
