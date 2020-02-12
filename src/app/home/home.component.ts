import {Component, OnInit} from '@angular/core';
import {ScullyRoutesService} from '@scullyio/ng-lib';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {MetadataService} from '../layout/services/metadata/metadata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  links$: Observable<any> = this.scully.available$
    .pipe(
      tap(links => console.log(links)),
      map(links => links.filter(l => l.route.startsWith('/blog/')).splice(0, 10)),
      map(posts => posts
        .sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1))
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

}
