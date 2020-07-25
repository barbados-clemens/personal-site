import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private meta: Meta,
    private titleSrv: Title,
    @Inject(DOCUMENT) private dom
  ) {
  }

  update(metadata: SeoMetadata): void {
    this.titleSrv.setTitle(`${metadata.title} | Caleb Ukle`);

    this.meta.updateTag({
      property: 'og:title', content: metadata.title
    });

    this.meta.updateTag({
      name: 'twitter:title', content: metadata.title
    });

    this.meta.updateTag({
      name: 'twitter:description', content: metadata.desc
    });

    this.meta.updateTag({
      property: 'og:description', content: metadata.desc
    });

    this.meta.updateTag({
      name: 'description', content: metadata.desc
    });


    this.meta.updateTag({
      property: 'og:url', content: metadata.url
    });

    this.meta.updateTag({
      name: 'twitter:image', content: metadata.image || 'https://media.calebukle.com/uploads/icon-48x48.png'
    });

    this.meta.updateTag({
      property: 'og:image', content: metadata.image || 'https://media.calebukle.com/uploads/icon-48x48.png'
    });

    this.updateCanonical(metadata.url || 'https://calebukle.com');
  }


  private updateCanonical(url: string): void {
    const head = this.dom.querySelector('head')[0];
    let element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null;
    if (!element) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);

  }
}


export interface SeoMetadata {
  title: string;
  desc: string;
  url: string;
  image?: string;
}
