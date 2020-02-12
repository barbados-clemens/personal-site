import {Inject, Injectable} from '@angular/core';
import {PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import 'clipboard';
import * as Prism from 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar.min';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min';
import 'prismjs/components/prism-css.min';
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-regex.min';
import 'prismjs/components/prism-bash.min';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('highlighted');
      Prism.highlightAll();
    }
  }
}
