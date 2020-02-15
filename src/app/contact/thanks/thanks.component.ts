import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss'],
})
export class ThanksComponent implements OnInit {

  cardInfo$ = this.scully.available$
    .pipe(
      map(posts => posts
        .sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1)),
      map(links => links.filter(l => l.route.startsWith('/blog/'))[0]),
    );

  constructor(
    private scully: ScullyRoutesService,
  ) {
  }

  ngOnInit(): void {
  }

}
