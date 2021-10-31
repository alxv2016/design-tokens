import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'c-demo-card',
  templateUrl: './demo-card.component.html',
  styleUrls: ['./demo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoCardComponent implements OnInit {
  @HostBinding('class') class = 'c-demo-card';
  constructor() {}

  ngOnInit(): void {}
}
