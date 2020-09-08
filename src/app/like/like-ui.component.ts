import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-like-ui',
  templateUrl: './like-ui.component.html',
  styleUrls: ['./like-ui.component.scss'],
})
export class LikeUiComponent {

  @Output()
  like = new EventEmitter<boolean>();

  isAnimating = false;
  @Input()
  count: number;

  @Input()
  hoverMessage = 'Click if you enjoyed!';

  constructor() {
  }

  addLike(): void {
    this.like.emit(true);
    this.count++;
  }

}
