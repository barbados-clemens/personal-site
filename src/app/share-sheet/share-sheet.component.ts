import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-share-sheet',
  templateUrl: './share-sheet.component.html',
  styleUrls: ['./share-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareSheetComponent {

  @Input()
  shareUrl: string;

  @Input()
  shareTitle: string;

  constructor(
    private clipboard: Clipboard
  ) {
  }

  async copyOrShare(): Promise<void> {
    const url = `https://calebukle.com${this.shareUrl}`;
    try {
      if (navigator?.share) {
        await navigator.share({url});
      } else {
        this.clipboard.copy(url);
      }
    } catch (shareEx) {
      console.warn('unable to use share. falling back to clipboard');
      if (shareEx && !/cancellation/.test(shareEx.message)) {
        console.error('unknown share error', shareEx);
      }
      this.clipboard.copy(url);
    }
  }

  buildShareLink(platform: ShareablePlatforms): string {
    switch (platform) {
      case 'REDDIT':
        return `https://www.reddit.com/submit?url=https://calebukle.com${this.shareUrl}&title=${this.shareTitle}`;
      case 'TUMBLR':
        return `http://tumblr.com/widgets/share/tool?canonicalUrl=${this.shareUrl}&posttype=link&title=${this.shareTitle}`;
      case 'PINTEREST':
        return `https://pinterest.com/pin/create/button/?url=https://calebukle.com${this.shareUrl}&description=${this.shareTitle}`;
      case 'LINKEDIN':
        return `https://www.linkedin.com/shareArticle?mini=true&url=https://calebukle.com${this.shareUrl}&title=${this.shareTitle}`;
      case 'TWITTER':
        // tslint:disable-next-line:max-line-length
        return `https://twitter.com/intent/tweet?text=${this.shareTitle}${encodeURI(' |')}&url=https://calebukle.com${this.shareUrl}&via=CU_galaxy`;
      case 'FACEBOOK':
        return `https://www.facebook.com/sharer/sharer.php?u=https://calebukle.com${this.shareUrl}`;
      case 'EMAIL':
        return `mailto:?subject=${this.shareTitle}&body=https://calebukle.com${this.shareUrl}`;
      default:
        return this.shareUrl;

    }
  }
}

type ShareablePlatforms =
  | 'TWITTER'
  | 'FACEBOOK'
  | 'EMAIL'
  | 'REDDIT'
  | 'TUMBLR'
  | 'PINTEREST'
  | 'LINKEDIN';
