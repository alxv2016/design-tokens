import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'c-token-card',
  templateUrl: './token-card.component.html',
  styleUrls: ['./token-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokenCardComponent implements OnInit {
  @HostBinding('class') class = 'c-token-card';
  constructor(private element: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {}
}
