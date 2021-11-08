import {AfterViewInit, Component, ElementRef, HostBinding, Input, NgZone, OnInit, Renderer2} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

@Component({
  selector: 'c-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'c-hero';
  @HostBinding('style.--a-start') @Input() aStart: string = '0%';
  @HostBinding('style.--a-end') @Input() aEnd: string = '0%';
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
