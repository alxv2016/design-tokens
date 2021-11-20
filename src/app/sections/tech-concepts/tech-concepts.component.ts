import {AfterViewInit, Component, ElementRef, HostBinding, Input, NgZone, OnInit, Renderer2} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

@Component({
  selector: 's-tech-concepts',
  templateUrl: './tech-concepts.component.html',
  styleUrls: ['./tech-concepts.component.scss'],
})
export class TechConceptsComponent implements AfterViewInit {
  @HostBinding('class') class = 's-tech-concepts';
  @HostBinding('style.--a-start') @Input() aStart: string = '0%';
  @HostBinding('style.--a-end') @Input() aEnd: string = '0%';
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  ngAfterViewInit(): void {}
}
