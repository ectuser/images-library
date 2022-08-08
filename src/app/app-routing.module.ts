import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './features/photos/photos/photos.component';
import { SinglePhotoComponent } from './features/photos/single-photo/single-photo.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: PhotosComponent,
    pathMatch: 'full',
    title: 'Photos',
  },
  {
    path: 'photos/:id',
    component: SinglePhotoComponent,
    title: 'Photo',
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/favorites.module').then((m) => m.FavoritesModule),
    title: 'Favorites',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
