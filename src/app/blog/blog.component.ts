import {AfterContentChecked, AfterContentInit, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ScullyRoutesService} from '@scullyio/ng-lib';
import {delay, filter, shareReplay, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {MetadataService} from '../layout/services/metadata/metadata.service';
import {BlogDbService} from './services/blogDb/blog-db.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements OnDestroy, AfterContentInit {
  subs = new Subject();
  meta$: Observable<IBlogFrontmatter> = this.scully.getCurrent()
    .pipe(
      takeUntil(this.subs),
      shareReplay(),
      tap(m => this.metaSrv.update({
        title: m.title,
        desc: m.description,
        url: `https://calebukle.com${m.route}`,
        image: m?.image,
      })),
    );

  likes$ = this.scully.getCurrent()
    .pipe(
      takeUntil(this.subs),
      switchMap(m => this.blogDb.likes$(m.route)),
    );

  constructor(
    private scully: ScullyRoutesService,
    private metaSrv: MetadataService,
    private blogDb: BlogDbService,
    private route: ActivatedRoute,
  ) {
  }

  ngAfterContentInit() {
    this.route.fragment
      .pipe(
        takeUntil(this.subs),
        delay(250),
      )
      .subscribe(f => {
        console.log(f);
        console.log(document.querySelector(`#${f}`)
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          }));
      });
  }

  addLike() {
    this.meta$
      .pipe(
        filter(m => !!m.route),
        take(1),
        switchMap(m => this.blogDb.addLike(m.route)),
      )
      .subscribe(_ => {
      });
  }

  ngOnDestroy(): void {
    this.subs.next(true);
    this.subs.complete();
  }
}


export interface IBlogFrontmatter {
  route: string;
  title?: string;
  date?: string;
  image?: string;
  description?: string;
  publish?: boolean;
  tags?: string[];
}
