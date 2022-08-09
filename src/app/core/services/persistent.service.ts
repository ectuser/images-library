import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { LocalStorageKey } from '../enums/local-storage';
import { PersistentCommonReturn, PersistentParam, PersistentReturnObservable, PersistentReturnSubject } from '../models/persistent';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PersistentService {
  private subscriptions: Partial<Record<LocalStorageKey, Subscription>> = {};

  constructor(private localStorageService: LocalStorageService) {}

  createPersistent<T>(obs$: Subject<T>, key: LocalStorageKey): PersistentReturnSubject<T>;
  createPersistent<T>(obs$: Observable<T>, key: LocalStorageKey): PersistentReturnObservable<T>;

  createPersistent<T>(obs$: PersistentParam<T>, key: LocalStorageKey): PersistentCommonReturn<T> {
    const storedData = this.localStorageService.get(key);

    if (storedData && obs$ instanceof Subject) {
      const obj = JSON.parse(storedData) as T;
      obs$.next(obj);
    }

    const subscription = obs$.subscribe((value) => {
      const strVal = typeof value !== 'string' ? JSON.stringify(value) : value;
      this.localStorageService.set(key, strVal);
    });

    this.addSubscription(subscription, key);

    const unsubscribe = (): void => {
      subscription.unsubscribe();
    };

    return { observable$: obs$, unsubscribe };
  }

  unsubscribeAll(): void {
    Object.values(this.subscriptions).forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private addSubscription(subscription: Subscription, key: LocalStorageKey): void {
    this.subscriptions[key] = subscription;
  }
}
