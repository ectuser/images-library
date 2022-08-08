import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotosApiService } from '../photos-api.service';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {
  constructor(private photosService: PhotosApiService) {}
}
