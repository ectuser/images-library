import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePhotoComponent {}
