import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {DemoCardComponent} from './demo-card/demo-card.component';

@NgModule({
  declarations: [HeaderComponent, DemoCardComponent],
  exports: [HeaderComponent, DemoCardComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
