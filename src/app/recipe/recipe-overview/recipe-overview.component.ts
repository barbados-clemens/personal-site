import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent {

  links$ = this.scully.available$
    .pipe(
      map(s => s.filter(r => r.route.startsWith('/recipe/')))
    );
  constructor(
    private scully: ScullyRoutesService
  ) { }

}
