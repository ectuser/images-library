import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';

@NgModule({
  declarations: [PhotosComponent],
  imports: [CommonModule],
  exports: [PhotosComponent],
})
export class PhotosModule {}
