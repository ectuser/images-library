import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../app-routing.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent],
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('route tests', () => {
    describe('base route', () => {
      beforeEach(async () => {
        await router.navigate(['/']);
      });

      beforeEach(fakeAsync(() => {
        fixture.detectChanges();
        tick();
      }));

      it('photos link should be highlighted', () => {
        const photosLink = fixture.debugElement.query(By.css('#photos-link'));

        expect(photosLink).toBeTruthy();
        const color = (photosLink.nativeElement as {color: string}).color;
        expect(color).toBe('primary');
      });
      it('favorites link should be basic', () => {
        const photosLink = fixture.debugElement.query(By.css('#favorites-link'));

        expect(photosLink).toBeTruthy();
        const color = (photosLink.nativeElement as {color: string}).color;
        expect(color).toBe('basic');
      });
    });
    describe('favorites route', () => {
      beforeEach(async () => {
        await router.navigate(['/favorites']);
      });

      beforeEach(fakeAsync(() => {
        fixture.detectChanges();
        tick();
      }));

      it('photos link should be basic', () => {
        const photosLink = fixture.debugElement.query(By.css('#photos-link'));

        expect(photosLink).toBeTruthy();
        const color = (photosLink.nativeElement as {color: string}).color;
        expect(color).toBe('basic');
      });
      it('favorites link should be highlighted', () => {
        const photosLink = fixture.debugElement.query(By.css('#favorites-link'));

        expect(photosLink).toBeTruthy();
        const color = (photosLink.nativeElement as {color: string}).color;
        expect(color).toBe('primary');
      });
    });
  });
});
