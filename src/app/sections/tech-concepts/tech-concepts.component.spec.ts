import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TechConceptsComponent} from './tech-concepts.component';

describe('TechConceptsComponent', () => {
  let component: TechConceptsComponent;
  let fixture: ComponentFixture<TechConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechConceptsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
