import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {
  photos$ = this.photosService.images$;

  constructor(private photosService: PhotosService) {}
}
