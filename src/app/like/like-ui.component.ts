import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-like-ui',
  templateUrl: './like-ui.component.html',
  styleUrls: ['./like-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
