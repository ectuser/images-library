import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [MatToolbarModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
