import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ScullyRoutesService} from '@scullyio/ng-lib';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {MetadataService} from '../layout/services/metadata/metadata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  sub = new Subject();

  links$ = this.scully.available$
    .pipe(
      takeUntil(this.sub),
      map(posts => posts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1)),
      map(links => links.filter(l => l.route.startsWith('/blog/')).slice(0, 1)),
      // map(posts => {
      //   const dates = new Set(posts.map(p => this.parseDateToTitle(p.date)));
      //   return Array.from(dates)
      //     .map(d => {
      //       return {
      //         date: d,
      //         posts: posts.filter(p => this.parseDateToTitle(p.date) === d)
      //       };
      //     });
      // })
    );

  constructor(
    private scully: ScullyRoutesService,
    private metaSrv: MetadataService,
  ) {
  }

  ngOnInit() {
    this.metaSrv.update({
      title: 'Home',
      url: 'https://calebukle.com',
      desc: 'Hey, my name is Caleb.'
    });
  }

  ngOnDestroy(): void {
    this.sub.next(true);
    this.sub.complete();
  }

  private parseDateToTitle(date: string) {
    return new Intl.DateTimeFormat(
      navigator.language,
      {month: 'long', year: 'numeric'}
    )
      .format(new Date(date));
  }
}
