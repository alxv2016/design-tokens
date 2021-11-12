import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntroComponent} from './intro/intro.component';
import {ComponentsModule} from '../components/components.module';
import {ValuePropComponent} from './value-prop/value-prop.component';

@NgModule({
  declarations: [IntroComponent, ValuePropComponent],
  exports: [IntroComponent, ValuePropComponent],
  imports: [CommonModule, ComponentsModule],
})
export class SectionsModule {}
