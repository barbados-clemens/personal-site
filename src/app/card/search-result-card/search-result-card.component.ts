import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISearchResult } from '../../blog/services/search/search.service';
import { animate, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
          animate(300),
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(300, style({ opacity: 0 }))),
    ]),
  ],
})
export class SearchResultCardComponent {

  @Input()
  searchResult: ISearchResult;

  constructor() {
  }

}
