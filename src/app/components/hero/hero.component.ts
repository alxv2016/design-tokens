import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Subject} from 'rxjs';

@Component({
  selector: 'c-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit {
  // pass scroll events to child components
  scrollTriggerEvents: Subject<boolean> = new Subject<boolean>();
  @Output() scrolled: EventEmitter<boolean> = new EventEmitter();
  @HostBinding('class') class = 'c-hero';
  @HostBinding('style.--a-start') @Input() aStart: string = '0%';
  @HostBinding('style.--a-end') @Input() aEnd: string = '0%';
  @ViewChildren('title', {read: ElementRef}) title!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {}

  private initGsap(): void {
    const titles = this.title.map((title) => title.nativeElement);
    const heroTL = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: this.element.nativeElement,
        start: 'top top',
        end: '120% top',
        scrub: 0.45,
        onLeave: () => {
          this.scrollTriggerEvents.next(false);
          this.scrollTriggerEvents.asObservable();
        },
        onLeaveBack: () => {
          this.scrollTriggerEvents.next(true);
        },
      },
    });

    heroTL
      .fromTo(
        titles,
        {
          yPercent: 0,
          textShadow: '0px 0px 0px rgba(0,70,249,1), 0px 0px 0px rgba(255,0,0,1)',
        },
        {
          yPercent: -40,
          textShadow: '4px 0px 0px rgba(0,70,249,1), -4px 0px 0px rgba(255,0,0,1)',
          duration: 4.75,
          stagger: 0.175,
        }
      )
      .to(
        this.element.nativeElement,
        {
          '--a-start': '60%',
          '--a-end': '200%',
          duration: 6,
        },
        0
      );
    // Set a delay after 1 second to refresh scrollTrigger instance
    gsap.delayedCall(1, () => {
      ScrollTrigger.refresh();
    });
  }

  ngAfterViewInit(): void {
    this.render.addClass(this.element.nativeElement, 'l-content--hide');
    this.ngZone.runOutsideAngular(() => {
      this.initGsap();
    });
  }
}
