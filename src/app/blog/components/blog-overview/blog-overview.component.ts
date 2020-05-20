import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ScullyRoutesService} from '@scullyio/ng-lib';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {DateHelperService} from '../../../services/date-helper.service';
import {animate, query, stagger, style, transition, trigger, useAnimation} from '@angular/animations';
import {staggerEnter} from '../../../../animations/animations';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeSlideUp', [
      transition(':enter', [
        useAnimation(staggerEnter, {
          params: {
            transform: 'translate(0,5em)'
          }
        })
      ])
    ])
  ]
})

export class BlogOverviewComponent {

  links$: Observable<any[]> = this.scully.available$
    .pipe(
      map((posts) => posts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1)),
      map((links) => links.filter((l) => l.route.startsWith('/blog/')).slice(0, 10)),
      map((posts) => {
        const dates = new Set(posts.map((p) => this.dateSrv.parseDateToTitle(p.date)));
        return Array.from(dates)
          .map((d) => {
            return {
              date: d,
              posts: posts.filter((p) => this.dateSrv.parseDateToTitle(p.date) === d)
            };
          });
      })
    );

  constructor(
    private route: ActivatedRoute,
    private scully: ScullyRoutesService,
    private dateSrv: DateHelperService,
  ) {
  }
}
