import { AfterContentChecked, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { HighlightService } from './services/highlight/highlight.service';
import { MetadataService } from '../layout/services/metadata/metadata.service';
import { BlogDbService } from './services/blogDb/blog-db.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements AfterContentChecked {
  meta$ = this.scully.getCurrent()
    .pipe(
      tap(m => this.metaSrv.update({
        title: m.title,
        desc: m.description,
        url: m.route,
        image: m?.image,
      })),
      shareReplay(1),
    );

  likes$ = this.scully.getCurrent()
    .pipe(
      switchMap(m => this.blogDb.likes$(m.route)),
    );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scully: ScullyRoutesService,
    private highlightSrv: HighlightService,
    private metaSrv: MetadataService,
    private blogDb: BlogDbService,
  ) {
  }

  ngAfterContentChecked() {
    setTimeout(() => {
      this.highlightSrv.highlightAll();
    }, 500);
  }

  addLike(route) {
    this.blogDb.addLike(route)
      .pipe(
        take(1),
      )
      .subscribe(r => {
      });
  }
}
