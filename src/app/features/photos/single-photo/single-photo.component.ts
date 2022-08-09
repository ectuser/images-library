import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, from, map, switchMap, take, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../../core/services/destroy.service';
import { FavoritesService } from '../../favorites/favorites.service';

@Component({
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SinglePhotoComponent {
  url$ = this.route.params.pipe(map((params) => params['id'] as string));
  isFavorite$ = combineLatest([this.url$, this.favoritesService.favorites$]).pipe(map(([url, favorites]) => favorites.indexOf(url) !== -1));

  constructor(
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
    private router: Router,
    @Self() private destroy$: DestroyService
  ) {}

  removeFromFavorites(): void {
    this.url$
      .pipe(take(1))
      .pipe(
        tap((url) => {
          this.favoritesService.removeFavorite(url);
        }),
        switchMap(() => {
          return from(this.router.navigate(['/favorites']));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
