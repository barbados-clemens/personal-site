import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ISearchResult } from '../../blog/services/search/search.service';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultCardComponent {

  @Input()
  searchResult: ISearchResult;

  constructor() {
  }

}
