import {Component, OnInit} from '@angular/core';
import {ScullyRoutesService} from '@scullyio/ng-lib';
import {filter, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss']
})
export class BlogOverviewComponent implements OnInit {

  links$ = this.scully.available$
    .pipe(
      map(links => links.filter(l => l.route.startsWith('/blog/')).slice(0, 10)),
      map(posts => posts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1))
    );

  query$ = this.route.queryParamMap
    .pipe(
      map(q => q.get('tag')),
      filter(tag => !!tag),
    );

  constructor(
    private route: ActivatedRoute,
    private scully: ScullyRoutesService,
  ) {
  }

  ngOnInit(): void {
  }

}
