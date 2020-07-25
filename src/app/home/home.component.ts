import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ScullyRoutesService} from '@scullyio/ng-lib';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';
import {MetadataService} from '../layout/services/metadata/metadata.service';
import {IBlogFrontmatter} from '../blog/blog.component';
import {animate, query, stagger, style, transition, trigger, useAnimation} from '@angular/animations';
import {staggerEnter} from '../../animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        useAnimation(staggerEnter, {
          params: {
            transform: 'translate(-10em,0)'
          }
        })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  sub = new Subject();
  oneMonthAgo = Date.now().valueOf() - 2629800000;

  links$: Observable<IBlogFrontmatter[]> = this.scully.available$
    .pipe(
      takeUntil(this.sub),
      map((posts) => posts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1)),
      map((links) => links.filter((l) => l.sourceFile !== '.DS_Store' && l.route.startsWith('/blog/')).slice(0, 4)),
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

  ngOnInit(): void {
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

  isNewPost(date: string): boolean {
    return new Date(date).valueOf() > this.oneMonthAgo;
  }

  private parseDateToTitle(date: string): string {
    return new Intl.DateTimeFormat(
      navigator.language,
      {month: 'long', year: 'numeric'}
    )
      .format(new Date(date));
  }
}
