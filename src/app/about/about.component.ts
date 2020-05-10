import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {

  // workingTime = this.timeSince(new Date('2017-05-30'));

  constructor() {
  }

  ngOnInit(): void {
  }

  private timeSince(start: Date): string {

    // @ts-ignore
    const rtf = new Intl.RelativeTimeFormat(navigator.language, {style: 'narrow'});

    return rtf.format((new Date(Date.now()).valueOf() - start.valueOf()) / 86400000, 'day');


  }
}
