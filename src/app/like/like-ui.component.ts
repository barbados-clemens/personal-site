import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-like-ui',
  templateUrl: './like-ui.component.html',
  styleUrls: ['./like-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // animations: [
  //   trigger('slideInOut', [
  //     transition(':enter, * => 0, * => -1', []),
  //     transition(':increment', [
  //       // query(':enter', [
  //       style({ transform: 'translateY(0%)', opacity: 0, position: 'absolute' }),
  //       animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: .8, transform: 'translateY(-200%)' })),
  //       //   style({ opacity: 0, width: '0px' }),
  //       //     animate('300ms ease-out', style({ opacity: 1, width: '*' })),
  //       // stagger(50, [
  //       // ]),
  //       // ], { optional: true })
  //     ]),
  //     transition(':decrement', [
  //       // query(':leave', [
  //       // stagger(50, [
  //       animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ transform: 'translateY(-100%)' })),
  //       // animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
  //       // ]),
  //       // ])
  //     ]),
  //     // transition(':enter', [
  //
  //     // transition(':increment', [
  //     // ]),
  //     // ]),
  //     // transition(':leave', [
  //     //   transition(':decrement', [
  //     //   ]),
  //     // ]),
  //   ]),
  // ],
})
export class LikeUiComponent {
  @ViewChild('like')
  likeButton: ElementRef<HTMLDivElement>;

  @Output()
  like = new EventEmitter<boolean>();

  isAnimating = false;
  @Input()
  count: number;

  @Input()
  hoverMessage = 'Click if you enjoyed!';

  constructor() {
  }

  addLike() {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 2000);
    this.likeButton.nativeElement.classList.add('is_animating');
    this.likeButton.nativeElement.onanimationend = () => {
      this.likeButton.nativeElement.classList.remove('is_animating');
    };
    this.like.emit(true);
    this.count++;
  }

}
