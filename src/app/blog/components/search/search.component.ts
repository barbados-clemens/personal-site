import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  searchControl: FormControl;
searchResults$: Observable<any>;
  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.searchControl = this.fb.control('');
    this.searchResults$ = this.searchControl.valueChanges
      .pipe(
        debounceTime(250),
        tap(q => this.searchService.searchTextSub.next(q ?? null)),
        switchMap(q => this.searchService.results$),
      );
  }

}
