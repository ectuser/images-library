import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { combineLatest, map, Observable, takeUntil } from 'rxjs';
import { FavoritesService } from '../../favorites/favorites.service';
import { PhotoWithStatus } from '../photo.model';
import { PhotosService } from '../photos.service';
import { DestroyService } from '../../../core/services/destroy.service';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class PhotosComponent {
  photos$: Observable<PhotoWithStatus[]> = combineLatest([this.photosService.images$, this.favoritesService.favorites$]).pipe(
    map(([images, favorites]) => {
      return images.map((image) => {
        return {
          url: image,
          isFavorite: favorites.indexOf(image) === -1 ? false : true,
        };
      });
    })
  );
  isLoading$ = this.photosService.loading$;

  constructor(private photosService: PhotosService, private favoritesService: FavoritesService, @Self() private destroy$: DestroyService) {}

  loadImages(): void {
    console.log('load');

    this.photosService.loadImages().pipe(takeUntil(this.destroy$)).subscribe();
  }

  addToFavorites(url: string): void {
    this.favoritesService.addFavorite(url);
  }
}
