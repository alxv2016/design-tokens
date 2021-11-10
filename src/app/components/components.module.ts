import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {DemoCardComponent} from './demo-card/demo-card.component';
import {DesignTokenComponent} from './design-token/design-token.component';
import {HeroComponent} from './hero/hero.component';
import {ScrollIndicatorComponent} from './scroll-indicator/scroll-indicator.component';
import {TokenCardComponent} from './token-card/token-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DemoCardComponent,
    DesignTokenComponent,
    HeroComponent,
    ScrollIndicatorComponent,
    TokenCardComponent,
  ],
  exports: [
    HeaderComponent,
    DemoCardComponent,
    DesignTokenComponent,
    HeroComponent,
    ScrollIndicatorComponent,
    TokenCardComponent,
  ],
  imports: [CommonModule],
})
export class ComponentsModule {}
