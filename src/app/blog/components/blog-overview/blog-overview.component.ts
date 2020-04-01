import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ScullyRoutesService} from '@scullyio/ng-lib';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BlogOverviewComponent {

  links$: Observable<any[]> = this.scully.available$
    .pipe(
      map(posts => posts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1)),
      map(links => links.filter(l => l.route.startsWith('/blog/')).slice(0, 10)),
      map(posts => {
        const dates = new Set(posts.map(p => this.parseDateToTitle(p.date)));
        return Array.from(dates)
          .map(d => {
            return {
              date: d,
              posts: posts.filter(p => this.parseDateToTitle(p.date) === d)
            };
          });
      })
    );

  constructor(
    private route: ActivatedRoute,
    private scully: ScullyRoutesService,
  ) {
  }

  private parseDateToTitle(date: string) {
    return new Intl.DateTimeFormat(
      navigator.language,
      {month: 'long', year: 'numeric'}
    )
      .format(new Date(date));
  }
}
