import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';

@NgModule({
  declarations: [PhotosComponent, SinglePhotoComponent],
  imports: [CommonModule],
  exports: [PhotosComponent, SinglePhotoComponent],
})
export class PhotosModule {}
