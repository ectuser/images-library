import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, take } from 'rxjs';
import { FavoritesService } from '../../favorites/favorites.service';

@Component({
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePhotoComponent {
  url$ = this.route.params.pipe(map((params) => params['id'] as string));
  isFavorite$ = combineLatest([this.url$, this.favoritesService.favorites$]).pipe(map(([url, favorites]) => favorites.indexOf(url) !== -1));

  constructor(private route: ActivatedRoute, private favoritesService: FavoritesService) {}

  removeFromFavorites(): void {
    this.url$.pipe(take(1)).subscribe((url) => {
      this.favoritesService.removeFavorite(url);
    });
  }
}
