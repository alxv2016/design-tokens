import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'c-design-token',
  templateUrl: './design-token.component.html',
  styleUrls: ['./design-token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokenComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'c-design-token';
  @ViewChild('tokenSheen') tokenSheen!: ElementRef;
  @ViewChildren('tokenRing', {read: ElementRef}) tokenRing!: QueryList<ElementRef>;
  @ViewChildren('tokenCubeStroke', {read: ElementRef}) tokenCubeStroke!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const tokenRings = this.tokenRing.map((ring) => ring.nativeElement);
    const tokenCubeStrokes = this.tokenCubeStroke.map((stroke) => stroke.nativeElement);
    const token = gsap.timeline({
      defaults: {
        ease: 'back',
        duration: 3,
        repeat: -1,
        repeatDelay: 2,
        yoyo: true,
      },
    });

    token
      .from(tokenRings, {
        strokeWidth: 1.25,
        opacity: 0,
        stagger: 0.275,
        ease: 'bounce',
      })
      .from(this.tokenSheen.nativeElement, {
        rotate: -25,
        opacity: 0,
        transformOrigin: 'center',
      })
      .from(tokenCubeStrokes, {
        strokeDasharray: 400,
        strokeDashoffset: 400,
        opacity: 0,
        stagger: 0.275,
      });
  }
}
