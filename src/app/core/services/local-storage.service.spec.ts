import { TestBed } from '@angular/core/testing';
import { LocalStorageKey } from '../enums/local-storage';

import { LocalStorageService } from './local-storage.service';

class LocalStorageMock {
  store: Record<string, string> = {};

  length = Object.keys(this.store).length;

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }
}

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item', () => {
    const setItemSpy = jest.spyOn(localStorage, 'setItem');

    service.set(LocalStorageKey.Favorites, 'test val');

    expect(setItemSpy).toHaveBeenCalledWith('images__favorites', 'test val');
    expect(localStorage.getItem('images__favorites')).toBe('test val');
  });

  it('should get item', () => {
    localStorage.setItem('images__favorites', 'data data');

    const setItemSpy = jest.spyOn(localStorage, 'getItem');

    const res = service.get(LocalStorageKey.Favorites);

    expect(setItemSpy).toHaveBeenCalledWith('images__favorites');
    expect(res).toBe('data data');
  });
});
