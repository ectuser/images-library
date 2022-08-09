import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {}
