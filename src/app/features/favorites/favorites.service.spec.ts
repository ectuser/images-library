import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocalStorageKey } from '../../core/enums/local-storage';
import { PersistentService } from '../../core/services/persistent.service';

import { FavoritesService } from './favorites.service';

class PersistentServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createPersistent(obs$: Subject<string[]>, key: LocalStorageKey) {
    return { observable$: obs$ }
  }
}

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PersistentService, useClass: PersistentServiceMock }]
    });
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getter should return subject value', (done) => {
    service['favoritesSubject$'] = new BehaviorSubject(['123', '321']);
    service.favorites$.subscribe((val) => {
      expect(val).toEqual(['123', '321']);
      done();
    });
  });

  describe('addFavorite', () => {
    it('should add unique', (done) => {
      service['favoritesSubject$'] = new BehaviorSubject(['123', '321']);

      service.addFavorite('abc');

      service.favorites$.subscribe((val) => {
        expect(val).toEqual(['123', '321', 'abc']);
        done();
      });
    });

    it('should not add unique', (done) => {
      const subjSpy = jest.spyOn(service['favoritesSubject$'], 'next');

      service['favoritesSubject$'] = new BehaviorSubject(['123', '321']);

      service.addFavorite('123');

      service.favorites$.subscribe((val) => {
        expect(val).toEqual(['123', '321']);
        expect(subjSpy).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });

  it('should remove from favorites subject', (done) => {
    service['favoritesSubject$'] = new BehaviorSubject(['123', '321']);

    service.removeFavorite('123');

    service.favorites$.subscribe((val) => {
      expect(val).toEqual(['321']);
      done();
    });
  });
});
