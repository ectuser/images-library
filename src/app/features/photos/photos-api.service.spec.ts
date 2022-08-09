import { TestBed } from '@angular/core/testing';

import { PhotosApiService } from './photos-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CONFIG_TOKEN } from '../../core/injection-tokens/config';
import { Config } from '../../../environments/config.model';
import { PhotoResponse } from './photo.model';

const configMock: Config = {
  production: false,
  apiEndpoints: {
    photos: 'test-endpoint',
  },
} as Config;

describe('PhotosService', () => {
  let service: PhotosApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CONFIG_TOKEN, useValue: configMock }]
    });
    service = TestBed.inject(PhotosApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of photos', (done) => {
    const mockResult: PhotoResponse = {
      message: ['url1', 'url2', 'url3'],
      status: 'success'
    };

    service.getImages().subscribe((result) => {
      expect(result).toEqual(mockResult);
      done();
    });

    const req = httpMock.expectOne('test-endpoint/random/6');
    expect(req.request.method).toBe("GET");
    req.flush(mockResult);
  });
});
