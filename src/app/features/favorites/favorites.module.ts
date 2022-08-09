import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { ImagesSectionComponent } from '../../shared/images-section/images-section.component';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, FavoritesRoutingModule, ImagesSectionComponent],
})
export class FavoritesModule {}
