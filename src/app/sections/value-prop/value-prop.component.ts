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
  selector: 's-value-prop',
  templateUrl: './value-prop.component.html',
  styleUrls: ['./value-prop.component.scss'],
})
export class ValuePropComponent implements AfterViewInit {
  @HostBinding('class') class = 's-value-prop';
  @HostBinding('style.--a-start') @Input() aStart: string = '0%';
  @HostBinding('style.--a-end') @Input() aEnd: string = '0%';
  @ViewChild('vortexContainer') vortexContainer!: ElementRef;
  @ViewChild('vortexHeading') vortexHeading!: ElementRef;
  @ViewChild('vortex') vortex!: ElementRef;
  @ViewChild('scrolltext') scrolltext!: ElementRef;
  @ViewChildren('ring', {read: ElementRef}) ring!: QueryList<ElementRef>;
  @ViewChildren('title', {read: ElementRef}) title!: QueryList<ElementRef>;
  @ViewChild('tokenSheen') tokenSheen!: ElementRef;
  @ViewChildren('tokenRing', {read: ElementRef}) tokenRing!: QueryList<ElementRef>;
  @ViewChildren('tokenPen', {read: ElementRef}) tokenPen!: QueryList<ElementRef>;
  @ViewChildren('tokenGlitch', {read: ElementRef}) tokenGlitch!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  private initGsap(): void {
    const rings = this.ring.map((ring) => ring.nativeElement);
    const titles = this.title.map((title) => title.nativeElement);
    const tokenGlitches = this.tokenGlitch.map((glitch) => glitch.nativeElement);
    const tokenRings = this.tokenRing.map((ring) => ring.nativeElement);
    const tokenPens = this.tokenPen.map((pen) => pen.nativeElement);

    ScrollTrigger.create({
      markers: false,
      trigger: this.vortexContainer.nativeElement,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.45,
      pin: true,
      anticipatePin: 1,
      pinSpacing: true,
    });

    const tokenTL = gsap.timeline({
      defaults: {
        duration: 4,
      },
      scrollTrigger: {
        markers: false,
        trigger: this.vortex.nativeElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.75,
      },
    });

    tokenTL
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
      .from(this.tokenSheen.nativeElement, {
        rotate: -25,
        opacity: 0,
        transformOrigin: 'center',
      });

    const introTL = gsap.timeline({
      defaults: {
        duration: 4,
      },
      scrollTrigger: {
        markers: false,
        trigger: this.element.nativeElement,
        start: '-28% top',
        end: '70% top',
        scrub: 0.45,
      },
    });

    introTL
      .from(titles, {
        yPercent: 65,
        textShadow: '4px 0px 0px rgba(0,70,249,1), -4px 0px 0px rgba(255,0,0,1)',
        stagger: 1.75,
        opacity: 0,
        transformOrigin: 'left center',
      })
      .from(
        this.vortex.nativeElement,
        {
          scale: 1.35,
        },
        2.45
      )
      .from(
        rings,
        {
          opacity: 0,
          rotate: -720,
          stagger: 1.75,
          duration: 8,
          transformOrigin: 'center',
          ease: 'back',
        },
        2.45
      )
      .to(this.element.nativeElement, {
        '--a-start': '20%',
        '--a-end': '120%',
        duration: 6,
      })
      .from(
        this.vortexHeading.nativeElement,
        {
          textShadow: '4px 0px 0px rgba(0,70,249,1), -4px 0px 0px rgba(255,0,0,1)',
          yPercent: 75,
          opacity: 0,
        },
        6
      );
    // Set a delay after 1 second to refresh scrollTrigger instance
    gsap.delayedCall(1, () => {
      ScrollTrigger.refresh();
    });
  }

  ngAfterViewInit(): void {
    this.render.addClass(this.vortexContainer.nativeElement, 'l-content--hide');
    this.ngZone.runOutsideAngular(() => {
      this.initGsap();
    });
  }
}
