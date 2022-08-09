import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSubject$ = new BehaviorSubject<string[]>([]);

  get favorites$(): Observable<string[]> {
    return this.favoritesSubject$.asObservable();
  }

  addFavorite(url: string): void {
    this.favoritesSubject$.next([...this.favoritesSubject$.value, url]);
  }
}
