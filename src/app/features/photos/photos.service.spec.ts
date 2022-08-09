import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PhotoResponse } from './photo.model';
import { PhotosApiService } from './photos-api.service';

import { PhotosService } from './photos.service';

class PhotosApiServiceMock {
  getImages(): Observable<PhotoResponse> {
    return of({
      message: ['one', 'two'],
      status: 'success'
    });
  }
}

describe('PhotosService', () => {
  let service: PhotosService;
  let apiService: PhotosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PhotosApiService, useClass: PhotosApiServiceMock }]
    });
    service = TestBed.inject(PhotosService);
    apiService = TestBed.inject(PhotosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getter should return value of beh subject', (done) => {
    service['imagesSubject$'] = new BehaviorSubject(['data1', 'data2']);
    service.images$.subscribe((res) => {
      expect(res).toEqual(['data1', 'data2']);
      done();
    });
  });

  describe('loadImages', () => {
    it('should load images', (done) => {
      const apiSpy = jest.spyOn(apiService, 'getImages');

      service.loadImages().subscribe(() => {
        expect(apiSpy).toHaveBeenCalled();

        done();
      });
    });
    it('should set data to beh subject', (done) => {
      service['imagesSubject$'] = new BehaviorSubject<string[]>([]);

      service.loadImages().subscribe(() => {
        expect(service['imagesSubject$'].value).toEqual(['one', 'two']);

        done();
      });
    });
  });
});
