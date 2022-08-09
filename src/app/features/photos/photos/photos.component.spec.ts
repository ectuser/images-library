import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FavoritesService } from '../../favorites/favorites.service';
import { PhotosService } from '../photos.service';

import { PhotosComponent } from './photos.component';

class PhotosServiceMock {
  get images$(): Observable<string[]> {
    return of(['first', 'second', 'third'])
  }

  loadImages() {
    return of(null);
  }
}

class FavoritesServiceMock {
  get favorites$(): Observable<string[]> {
    return of(['second', 'third'])
  }

  addFavorite(url: string): void {
    jest.fn(() => url);
  }
}

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      providers: [{ provide: PhotosService, useClass: PhotosServiceMock }, { provide: FavoritesService, useClass: FavoritesServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transform strings array of images to array of objects', (done) => {
    component.photos$.subscribe((val) => {
      expect(val).toEqual([{ url: 'first', isFavorite: false }, { url: 'second', isFavorite: true }, { url: 'third', isFavorite: true }]);
      done();
    });
  });

  it('should load images', () => {
    const spy = jest.spyOn(component['photosService'], 'loadImages');

    component.loadImages();

    expect(spy).toHaveBeenCalled();
  });

  it('should add to favorites', () => {
    const spy = jest.spyOn(component['favoritesService'], 'addFavorite');

    component.addToFavorites('test');

    expect(spy).toHaveBeenCalled();
  });
});
