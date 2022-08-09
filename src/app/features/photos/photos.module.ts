import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';
import { MaterialModule } from 'src/app/material.module';
import { PhotoCardComponent } from './photo-card/photo-card.component';

@NgModule({
  declarations: [PhotosComponent, SinglePhotoComponent, PhotoCardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PhotosComponent, SinglePhotoComponent],
})
export class PhotosModule {}
