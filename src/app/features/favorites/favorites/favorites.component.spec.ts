import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { appRoutes } from '../../../app-routing.module';
import { FavoritesService } from '../favorites.service';

import { FavoritesComponent } from './favorites.component';

class FavoritesServiceMock {
  get favorites$(): Observable<string[]> {
    return of(['one', 'two']);
  }
}

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      providers: [{ provide: FavoritesService, useClass: FavoritesServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect after call goToImage', async () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    await component.goToImage('img-url');
    expect(navigateSpy).toHaveBeenCalledWith(['/photos', 'img-url']);
  });

  it('should transform favorites string array to array of objects', (done) => {
    component.images$.subscribe((val) => {
      expect(val).toEqual([
        { url: 'one', isFavorite: true },
        { url: 'two', isFavorite: true }
      ]);
      done();
    });
  });
});
