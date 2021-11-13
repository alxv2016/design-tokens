import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

@Component({
  selector: 's-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements AfterViewInit {
  @HostBinding('class') class = 's-intro';
  @HostBinding('style.--a-start') @Input() aStart: string = '0%';
  @HostBinding('style.--a-end') @Input() aEnd: string = '0%';
  @ViewChild('tokenSheen') tokenSheen!: ElementRef;
  @ViewChild('lensGlare') lensGlare!: ElementRef;
  @ViewChildren('tokenRing', {read: ElementRef}) tokenRing!: QueryList<ElementRef>;
  @ViewChildren('tokenPen', {read: ElementRef}) tokenPen!: QueryList<ElementRef>;
  @ViewChildren('tokenGlitch', {read: ElementRef}) tokenGlitch!: QueryList<ElementRef>;
  @ViewChildren('lensFlare', {read: ElementRef}) lensFlare!: QueryList<ElementRef>;
  @ViewChildren('title', {read: ElementRef}) title!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  private initGsap(): void {
    const tokenGlitches = this.tokenGlitch.map((glitch) => glitch.nativeElement);
    const tokenRings = this.tokenRing.map((ring) => ring.nativeElement);
    const tokenPens = this.tokenPen.map((pen) => pen.nativeElement);
    const lensFlares = this.lensFlare.map((flare) => flare.nativeElement);
    const titles = this.title.map((title) => title.nativeElement);

    const tokenTL = gsap.timeline({
      defaults: {
        duration: 4,
      },
      scrollTrigger: {
        markers: false,
        trigger: this.element.nativeElement,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.75,
      },
    });

    tokenTL
      .from(titles, {
        opacity: 0,
        yPercent: 65,
        stagger: 0.75,
        textShadow: '4px 0px 0px rgba(0,70,249,1), -4px 0px 0px rgba(255,0,0,1)',
      })
      .from(tokenGlitches, {
        opacity: 0,
        skewY: 3,
        scale: 1.0175,
        stagger: 0.75,
        transformOrigin: 'center',
      })
      .from(tokenRings, {
        strokeWidth: 1.25,
        opacity: 0,
        stagger: 0.275,
        ease: 'bounce',
      })
      .from(
        tokenPens,
        {
          strokeWidth: 0.75,
          stagger: 0.45,
          opacity: 0,
        },
        2.95
      )
      .from(
        this.lensGlare.nativeElement,
        {
          rotate: -20,
          opacity: 0,
          transformOrigin: 'center',
        },
        5
      )
      .from(
        lensFlares,
        {
          ease: 'power3',
          scale: 0.125,
          opacity: 0,
          transformOrigin: 'center',
        },
        5.25
      )
      .from(this.tokenSheen.nativeElement, {
        rotate: -25,
        opacity: 0,
        transformOrigin: 'center',
      })
      .to(this.element.nativeElement, {
        '--a-start': '40%',
        '--a-end': '160%',
        duration: 6,
      });

    // Set a delay after 1 second to refresh scrollTrigger instance
    gsap.delayedCall(1, () => {
      ScrollTrigger.refresh();
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initGsap();
    });
  }
}
