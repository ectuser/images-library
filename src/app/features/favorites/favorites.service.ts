import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageKey } from '../../core/enums/local-storage';
import { PersistentService } from '../../core/services/persistent.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSubject$: BehaviorSubject<string[]>;

  get favorites$(): Observable<string[]> {
    return this.favoritesSubject$.asObservable();
  }

  constructor(private persistentService: PersistentService) {
    const { observable$: subject$ } = this.persistentService.createPersistent(new BehaviorSubject<string[]>([]), LocalStorageKey.Favorites);
    this.favoritesSubject$ = subject$;
  }

  addFavorite(url: string): void {
    this.favoritesSubject$.next([...this.favoritesSubject$.value, url]);
  }
}
