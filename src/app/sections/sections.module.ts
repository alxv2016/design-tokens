import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntroComponent} from './intro/intro.component';
import {ComponentsModule} from '../components/components.module';
import {ValuePropComponent} from './value-prop/value-prop.component';
import {TechConceptsComponent} from './tech-concepts/tech-concepts.component';

@NgModule({
  declarations: [IntroComponent, ValuePropComponent, TechConceptsComponent],
  exports: [IntroComponent, ValuePropComponent, TechConceptsComponent],
  imports: [CommonModule, ComponentsModule],
})
export class SectionsModule {}
