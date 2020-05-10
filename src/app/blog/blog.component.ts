import {AfterContentChecked, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ScullyRoutesService} from '@scullyio/ng-lib';
import {filter, shareReplay, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {HighlightService} from './services/highlight/highlight.service';
import {MetadataService} from '../layout/services/metadata/metadata.service';
import {BlogDbService} from './services/blogDb/blog-db.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements AfterContentChecked, OnDestroy {
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
    private highlightSrv: HighlightService,
    private metaSrv: MetadataService,
    private blogDb: BlogDbService,
  ) {
  }

  ngAfterContentChecked() {
    // TODO fix this hack
    setTimeout(() => {
      this.highlightSrv.highlightAll();
    }, 500);
  }

  addLike() {
    this.meta$
      .pipe(
        filter(m => !!m.route),
        take(1),
        switchMap(m => this.blogDb.addLike(m.route)),
      )
      .subscribe(r => {
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
