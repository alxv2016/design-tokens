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
  @ViewChild('tokenRing1') tokenRing1!: ElementRef;
  @ViewChild('tokenRing2') tokenRing2!: ElementRef;
  @ViewChild('tokenRing3') tokenRing3!: ElementRef;
  @ViewChild('tokenRing4') tokenRing4!: ElementRef;
  @ViewChild('tokenSheen') tokenSheen!: ElementRef;
  @ViewChildren('tokenCubeStroke', {read: ElementRef}) tokenCubeStroke!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const tokenCubeStrokes = this.tokenCubeStroke.map((stroke) => stroke.nativeElement);
    const token = gsap.timeline({
      defaults: {
        ease: 'back',
        duration: 3,
        repeat: -1,
        repeatDelay: 3,
        yoyo: true,
      },
    });

    token
      .fromTo(
        this.tokenRing1.nativeElement,
        {
          strokeWidth: 0,
          opacity: 0,
        },
        {
          strokeWidth: 11,
          opacity: 1,
        }
      )
      .fromTo(
        this.tokenRing2.nativeElement,
        {
          strokeWidth: 0,
          opacity: 0,
        },
        {
          strokeWidth: 3,
          opacity: 1,
        },
        0.2
      )
      .fromTo(
        this.tokenRing3.nativeElement,
        {
          strokeWidth: 0,
          opacity: 0,
        },
        {
          strokeWidth: 6,
          opacity: 1,
        },
        0.4
      )
      .fromTo(
        this.tokenRing4.nativeElement,
        {
          strokeWidth: 0,
          opacity: 0,
        },
        {
          strokeWidth: 3,
          opacity: 1,
        },
        0.6
      )
      .fromTo(
        tokenCubeStrokes,
        {
          strokeDasharray: 400,
          strokeDashoffset: 400,
          opacity: 0,
        },
        {
          strokeDasharray: 0,
          strokeDashoffset: 0,
          opacity: 1,
          stagger: 0.175,
        },
        1.2
      )
      .fromTo(
        this.tokenSheen.nativeElement,
        {
          rotate: -25,
          opacity: 0,
          transformOrigin: 'center',
        },
        {
          rotate: 0,
          opacity: 1,
          transformOrigin: 'center',
        },
        1.2
      );
  }
}
