import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { FavoritesService } from '../../favorites/favorites.service';
import { PhotoWithStatus } from '../photo.model';
import { PhotosService } from '../photos.service';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnDestroy {
  photos$: Observable<PhotoWithStatus[]> = combineLatest([this.photosService.images$, this.favoritesService.favorites$]).pipe(
    map(([images, favorites]) => {
      console.log('run');

      return images.map((image) => {
        return {
          url: image,
          isFavorite: favorites.indexOf(image) === -1 ? false : true,
        };
      });
    })
  );
  isLoading$ = this.photosService.loading$;

  private alive$ = new Subject();

  constructor(private photosService: PhotosService, private favoritesService: FavoritesService) {}

  ngOnDestroy(): void {
    this.alive$.next(null);
    this.alive$.complete();
  }

  loadImages(): void {
    console.log('load');

    this.photosService.loadImages().pipe(takeUntil(this.alive$)).subscribe();
  }

  addToFavorites(url: string): void {
    this.favoritesService.addFavorite(url);
  }
}
