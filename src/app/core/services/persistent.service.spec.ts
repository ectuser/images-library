import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { LocalStorageKey } from '../enums/local-storage';
import { LocalStorageService } from './local-storage.service';

import { PersistentService } from './persistent.service';

class LocalStorageServiceMock {
  get = jest.fn();

  set = jest.fn();
}

describe('PersistentService', () => {
  let service: PersistentService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useClass: LocalStorageServiceMock }]
    });
    service = TestBed.inject(PersistentService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should unsubscribe from all subscriptions', () => {
    service['subscriptions'] = {favorites: new Subscription()};

    Object.values(service['subscriptions']).forEach((el) => {
      expect(el.closed).toBe(false);
    });

    service.unsubscribeAll();

    Object.values(service['subscriptions']).forEach((el) => {
      expect(el.closed).toBe(true);
    });
  });

  describe('createPersistent', () => {
    it('should return the observable and function to unsubscribe', () => {
      const { observable$: subject$, unsubscribe } = service.createPersistent(new Subject<string>(), LocalStorageKey.Favorites);

      expect(subject$).toBeInstanceOf(Subject);
      expect(unsubscribe).toBeInstanceOf(Function);
    });
    it('should return observable', () => {
      const { observable$, unsubscribe } = service.createPersistent(new Observable<string>(), LocalStorageKey.Favorites);

      expect(observable$).toBeInstanceOf(Observable);
      expect(unsubscribe).toBeInstanceOf(Function);
    });
    it('should set value to subject if there is value in the local storage', (done) => {
      jest.spyOn(localStorageService, 'get').mockReturnValueOnce(JSON.stringify('data'));

      const { observable$: subject$ } = service.createPersistent(new BehaviorSubject<string>('init'), LocalStorageKey.Favorites);

      subject$.subscribe((val) => {
        expect(val).toBe('data');
        done();
      });
    });
    it('should change the localstorage on value change', () => {
      const { observable$: subject$ } = service.createPersistent(new Subject<string>(), LocalStorageKey.Favorites);

      const lsSpy = jest.spyOn(localStorageService, 'set');

      subject$.next('abc');

      expect(lsSpy).toHaveBeenCalledWith(LocalStorageKey.Favorites, 'abc');
    });
    it('should unsubscribe when unsubscribe callback is called', () => {
      const lsSpy = jest.spyOn(localStorageService, 'set');

      const { observable$: subject$, unsubscribe } = service.createPersistent(new BehaviorSubject<string>('init'), LocalStorageKey.Favorites);
      subject$.next('abc');
      expect(lsSpy).toHaveBeenCalledTimes(2); // initial and 'abc'
      unsubscribe();
      subject$.next('1234');
      expect(lsSpy).toHaveBeenCalledTimes(2); // no more calls
    });
  });
});
