import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogOverviewComponent {

  links$ = this.scully.available$
    .pipe(
      map(posts => posts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1)),
      map(links => links.filter(l => l.route.startsWith('/blog/')).slice(0, 10)),
    );

  constructor(
    private route: ActivatedRoute,
    private scully: ScullyRoutesService,
  ) {
  }

}
