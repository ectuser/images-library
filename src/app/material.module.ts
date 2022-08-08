import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const modules = [MatToolbarModule, MatButtonModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
