import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntroComponent} from './intro/intro.component';
import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [IntroComponent],
  exports: [IntroComponent],
  imports: [CommonModule, ComponentsModule],
})
export class SectionsModule {}
