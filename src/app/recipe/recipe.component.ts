import { Component, ViewEncapsulation } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { MetadataService } from '../layout/services/metadata/metadata.service';
import { shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class RecipeComponent {
  meta$ = this.scully.getCurrent()
    .pipe(
      tap(m => this.metaSrv.update({
        title: m.title,
        desc: m.description,
        url: m.route,
        image: m.image,
      })),
      shareReplay(1),
    );

  constructor(
    private scully: ScullyRoutesService,
    private metaSrv: MetadataService,
  ) {
  }
}
