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
  @ViewChildren('tokenGlitch', {read: ElementRef}) tokenGlitch!: QueryList<ElementRef>;
  @ViewChildren('lensFlare', {read: ElementRef}) lensFlare!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const tokenGlitches = this.tokenGlitch.map((glitch) => glitch.nativeElement);
    const tokenRings = this.tokenRing.map((ring) => ring.nativeElement);
    const tokenCubeStrokes = this.tokenCubeStroke.map((stroke) => stroke.nativeElement);
    const lensFlares = this.lensFlare.map((flare) => flare.nativeElement);

    const token = gsap.timeline({
      repeat: -1,
      repeatDelay: 4,
      yoyo: true,
      yoyoEase: 'back',
      defaults: {
        ease: 'back',
        duration: 2.25,
      },
    });

    token
      .from(tokenGlitches, {
        opacity: 0,
        skewY: 3,
        scale: 0.95,
        stagger: 0.275,
        transformOrigin: 'center',
      })
      .from(tokenRings, {
        strokeWidth: 1.25,
        opacity: 0,
        stagger: 0.275,
        ease: 'bounce',
      })
      .from(
        tokenCubeStrokes,
        {
          strokeDasharray: 400,
          strokeDashoffset: 400,
          opacity: 0,
          stagger: 0.275,
        },
        2.75
      )
      .from(lensFlares, {
        ease: 'power3',
        skewY: 25,
        scale: 0.125,
        opacity: 0,
        transformOrigin: 'center',
      })
      .from(this.tokenSheen.nativeElement, {
        rotate: -25,
        opacity: 0,
        transformOrigin: 'center',
      });
  }
}
