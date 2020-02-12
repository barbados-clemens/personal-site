import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-share-sheet',
  templateUrl: './share-sheet.component.html',
  styleUrls: ['./share-sheet.component.scss']
})
export class ShareSheetComponent {

  @Input()
  shareUrl: string;

  @Input()
  shareTitle: string;

  constructor() {
  }

  buildShareLink(platform: ShareablePlatforms): string {
    switch (platform) {
      case 'TWITTER':
        // tslint:disable-next-line:max-line-length
        return `https://twitter.com/intent/tweet?text=${this.shareTitle}${encodeURI(' |')}&url=https://calebukle.com${this.shareUrl}&via=CU_galaxy`;
      case 'FACEBOOK':
        return `https://www.facebook.com/sharer/sharer.php?u=https://calebukle.com${this.shareUrl}`;
      case 'EMAIL':
        return `mailto:?subject=${this.shareTitle}&body=https://calebukle.com${this.shareUrl}`;

    }
  }
}

type ShareablePlatforms =
  | 'TWITTER'
  | 'FACEBOOK'
  | 'EMAIL';
