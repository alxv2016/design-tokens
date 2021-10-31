import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'c-design-token',
  templateUrl: './design-token.component.html',
  styleUrls: ['./design-token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokenComponent implements OnInit {
  @HostBinding('class') class = 'c-design-token';
  constructor() {}

  ngOnInit(): void {}
}
