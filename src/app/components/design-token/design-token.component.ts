import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import {Observable} from 'rxjs';

@Component({
  selector: 'c-design-token',
  templateUrl: './design-token.component.html',
  styleUrls: ['./design-token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokenComponent implements AfterViewInit {
  token!: GSAPTimeline;
  @Input() heroEvents!: Observable<boolean>;
  @HostBinding('class') class = 'c-design-token';
  @ViewChild('tokenSheen') tokenSheen!: ElementRef;
  @ViewChild('lensGlare') lensGlare!: ElementRef;
  @ViewChildren('tokenRing', {read: ElementRef}) tokenRing!: QueryList<ElementRef>;
  @ViewChildren('tokenCube', {read: ElementRef}) tokenCube!: QueryList<ElementRef>;
  @ViewChildren('tokenGlitch', {read: ElementRef}) tokenGlitch!: QueryList<ElementRef>;
  @ViewChildren('lensFlare', {read: ElementRef}) lensFlare!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  private initGSAP(): void {
    const tokenGlitches = this.tokenGlitch.map((glitch) => glitch.nativeElement);
    const tokenRings = this.tokenRing.map((ring) => ring.nativeElement);
    const tokenCubes = this.tokenCube.map((stroke) => stroke.nativeElement);
    const lensFlares = this.lensFlare.map((flare) => flare.nativeElement);

    this.token = gsap.timeline({
      repeat: -1,
      repeatDelay: 5,
      yoyo: true,
      yoyoEase: 'back',
      defaults: {
        ease: 'back',
        duration: 2.25,
      },
    });

    this.token
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
        tokenCubes,
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
        scale: 0.125,
        opacity: 0,
        transformOrigin: 'center',
      })
      .from(this.tokenSheen.nativeElement, {
        rotate: -25,
        opacity: 0,
        transformOrigin: 'center',
      })
      .from(
        this.lensGlare.nativeElement,
        {
          rotate: -45,
          opacity: 0,
          transformOrigin: 'center',
        },
        6
      )
      .to(
        tokenGlitches,
        {
          scale: 1.035,
          stagger: 0.275,
          transformOrigin: 'center',
        },
        2.95
      );
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initGSAP();
    });

    this.heroEvents.subscribe((bool) => {
      bool ? this.token.play() : this.token.pause();
    });
  }
}
