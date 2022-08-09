import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { appRoutes } from '../../../app-routing.module';
import { FavoritesService } from '../../favorites/favorites.service';

import { SinglePhotoComponent } from './single-photo.component';

class FavoritesServiceMock {
  get favorites$(): Observable<string[]> {
    return of(['one', 'two']);
  }

  removeFavorite = jest.fn();
}

const paramsSubject$ = new BehaviorSubject({id: 'two'});

describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ SinglePhotoComponent ],
      providers: [
        { provide: FavoritesService, useClass: FavoritesServiceMock },
        {provide: ActivatedRoute, useValue: {params: paramsSubject$ }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract url from route', (done) => {
    component.url$.subscribe((url) => {
      expect(url).toBe('two');
      done();
    });
  });

  it('should return set is favorite true if url is inside of favorites list', (done) => {
    paramsSubject$.next({id: 'two'});

    component.isFavorite$.subscribe((val) => {
      expect(val).toBe(true);
      done();
    });
  });

  it('should return set is favorite false if favorites list does not include url', (done) => {
    paramsSubject$.next({id: 'three'});

    component.isFavorite$.subscribe((val) => {
      expect(val).toBe(false);
      done();
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove favorite', () => {
      paramsSubject$.next({id: 'three'});

      const favServiceSpy = jest.spyOn(component['favoritesService'], 'removeFavorite');

      component.removeFromFavorites();

      expect(favServiceSpy).toHaveBeenCalledWith('three');
    });

    it('should navigate to favorites', () => {
      const favServiceSpy = jest.spyOn(component['router'], 'navigate');

      component.removeFromFavorites();

      expect(favServiceSpy).toHaveBeenCalledWith(['/favorites']);
    });
  });
});
