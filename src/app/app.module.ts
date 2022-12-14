import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './core/layout/layout.component';
import { HeaderComponent } from './core/header/header.component';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PhotosModule } from './features/photos/photos.module';
import { CONFIG_TOKEN } from './core/injection-tokens/config';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { HandleErrorInterceptor } from './core/interceptors/handle-error.interceptor';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, HttpClientModule, PhotosModule, RouterModule],
  providers: [
    { provide: CONFIG_TOKEN, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
