import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MetadataService} from '../layout/services/metadata/metadata.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {

  // workingTime = this.timeSince(new Date('2017-05-30'));

  constructor(
    private meta: MetadataService,
  ) {
  }

  ngOnInit(): void {
    this.meta.update({
      title: 'About',
      desc: 'Learn more about Caleb such as background and projects',
      url: 'https://calebukle.com/about'
    });
  }

  private timeSince(start: Date): string {

    // @ts-ignore
    const rtf = new Intl.RelativeTimeFormat(navigator.language, {style: 'narrow'});

    return rtf.format((new Date(Date.now()).valueOf() - start.valueOf()) / 86400000, 'day');


  }
}
