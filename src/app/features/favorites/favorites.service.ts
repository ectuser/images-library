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
    if (this.favoritesSubject$.value.indexOf(url) === -1) {
      this.favoritesSubject$.next([...this.favoritesSubject$.value, url]);
    }
  }

  removeFavorite(url: string): void {
    const filteredFavorite = this.favoritesSubject$.value.filter((el) => el !== url);
    this.favoritesSubject$.next(filteredFavorite);
  }
}
