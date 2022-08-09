import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const modules = [MatToolbarModule, MatButtonModule, MatCardModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
