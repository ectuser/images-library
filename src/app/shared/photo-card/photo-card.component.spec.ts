import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PhotoCardComponent } from './photo-card.component';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCardComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('p tag', () => {
    it('should print "Favorite!" if the photo is favorite', () => {
      component.isFavorite = true;

      const pTag = fixture.debugElement.query(By.css('p'));

      expect((pTag.nativeElement as HTMLElement).textContent === 'Favorite!');
    });

    it('should print "Add to favorite" if the photo is not favorite', () => {
      component.isFavorite = false;

      const pTag = fixture.debugElement.query(By.css('p'));

      expect((pTag.nativeElement as HTMLElement).textContent === 'Add to favorite');
    });
  });
});
