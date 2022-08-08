import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LayoutComponent } from './layout/layout.component';

const modules = [MaterialModule];
const components = [LayoutComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ...modules],
  exports: [...modules, ...components],
})
export class CoreModule {}
