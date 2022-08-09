import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';
import { MaterialModule } from '../../material.module';
import { InfiniteScrollComponent } from '../../shared/infinite-scroll/infinite-scroll.component';
import { ImagesSectionComponent } from '../../shared/images-section/images-section.component';

@NgModule({
  declarations: [PhotosComponent, SinglePhotoComponent],
  imports: [CommonModule, MaterialModule, InfiniteScrollComponent, ImagesSectionComponent],
  exports: [PhotosComponent, SinglePhotoComponent],
})
export class PhotosModule {}
