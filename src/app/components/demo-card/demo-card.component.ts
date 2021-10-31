import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'c-demo-card',
  templateUrl: './demo-card.component.html',
  styleUrls: ['./demo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoCardComponent implements OnInit {
  @HostBinding('class') class = 'c-demo-card';
  @Input() devErrors: boolean = false;
  constructor(private element: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    if (this.devErrors) {
      this.render.addClass(this.element.nativeElement, 'dev-errors');
    }
  }
}
