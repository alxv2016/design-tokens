import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 's-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @HostBinding('class') class = 's-intro';
  constructor() {}

  ngOnInit(): void {}
}
