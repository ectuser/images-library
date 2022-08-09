import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../enums/local-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly base = 'images__';

  get(key: LocalStorageKey): string | null {
    const path = this.base + key;
    return localStorage.getItem(path);
  }

  set(key: LocalStorageKey, value: string): void {
    const path = this.base + key;
    localStorage.setItem(path, value);
  }
}
