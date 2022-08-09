import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PhotoWithStatus } from '../../photos/photo.model';
import { FavoritesService } from '../favorites.service';

@Component({
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  images$: Observable<PhotoWithStatus[]> = this.favoritesService.favorites$.pipe(
    map((favorites) => {
      return favorites.map((fav) => ({ url: fav, isFavorite: true }));
    })
  );

  constructor(private favoritesService: FavoritesService) {}
}
