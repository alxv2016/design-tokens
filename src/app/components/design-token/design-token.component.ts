import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
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
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const token = gsap.timeline({
      defaults: {
        ease: 'bounce',
        duration: 1.75,
        repeat: -1,
        yoyo: true,
        //stagger: 0.125
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
        0.25
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
        0.45
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
        0.75
      );
  }
}
