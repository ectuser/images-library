import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PhotosService } from '../photos.service';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnDestroy {
  photos$ = this.photosService.images$;
  isLoading$ = this.photosService.loading$;

  private alive$ = new Subject();

  constructor(private photosService: PhotosService) {}

  ngOnDestroy(): void {
    this.alive$.next(null);
    this.alive$.complete();
  }

  loadImages(): void {
    console.log('load');

    this.photosService.loadImages().pipe(takeUntil(this.alive$)).subscribe();
  }
}
