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

    const introTL = gsap.timeline({
      defaults: {
        ease: 'back',
        duration: 10,
      },
      scrollTrigger: {
        markers: false,
        trigger: this.vortexContainer.nativeElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.45,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
      },
    });

    introTL
      .from(rings, {
        opacity: 0,
        rotate: -360,
        // duration: 4.75,
        stagger: 0.45,
        transformOrigin: 'center',
      })
      .from(
        this.vortex.nativeElement,
        {
          scale: 1.45,
        },
        0
      )
      .from(this.vortexHeading.nativeElement, {
        yPercent: 45,
        opacity: 0,
      })
      .from(
        titles,
        {
          yPercent: 75,
          textShadow: '4px 0px 0px rgba(0,70,249,1), -4px 0px 0px rgba(255,0,0,1)',
          skewX: -16,
          duration: 6,
          stagger: 2,
          opacity: 0,
        },
        0
      )
      .from(
        tokenGlitches,
        {
          opacity: 0,
          skewY: 3,
          scale: 1.0175,
          stagger: 0.75,
          transformOrigin: 'center',
        },
        7
      )
      .from(
        tokenRings,
        {
          strokeWidth: 1.25,
          opacity: 0,
          stagger: 0.275,
          ease: 'bounce',
        },
        8
      )
      .from(
        tokenPens,
        {
          strokeDasharray: 400,
          strokeDashoffset: 400,
          opacity: 0,
          stagger: 0.275,
        },
        9
      )
      .from(
        this.tokenSheen.nativeElement,
        {
          rotate: -25,
          opacity: 0,
          transformOrigin: 'center',
        },
        10
      );
    // .to(
    //   this.element.nativeElement,
    //   {
    //     '--a-start': '60%',
    //     '--a-end': '200%',
    //     duration: 6,
    //   },
    //   0
    // );
    // Set a delay after 1 second to refresh scrollTrigger instance
    gsap.delayedCall(1, () => {
      ScrollTrigger.refresh();
    });
  }

  ngAfterViewInit(): void {
    //this.render.addClass(this.element.nativeElement, 'l-content--hide');
    this.ngZone.runOutsideAngular(() => {
      this.initGsap();
    });
  }
}
