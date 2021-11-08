import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {DemoCardComponent} from './demo-card/demo-card.component';
import {DesignTokenComponent} from './design-token/design-token.component';
import {HeroComponent} from './hero/hero.component';

@NgModule({
  declarations: [HeaderComponent, DemoCardComponent, DesignTokenComponent, HeroComponent],
  exports: [HeaderComponent, DemoCardComponent, DesignTokenComponent, HeroComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
