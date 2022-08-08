import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './features/photos/photos/photos.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosComponent,
    pathMatch: 'full',
    title: 'Photos',
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/favorites.module').then((m) => m.FavoritesModule),
    title: 'Favorites',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
