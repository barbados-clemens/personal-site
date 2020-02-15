import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { noop, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput')
  searchInput: ElementRef;

  searchForm: FormGroup;
  searchResults$: Observable<any>;

  cleanUp$ = new Subject();

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.searchForm = this.fb.group({
      text: [''],
    });

    this.searchResults$ = this.searchService.results$
      .pipe(
        takeUntil(this.cleanUp$.asObservable()),
        tap(r => !!r ? this.scrollToInput() : noop()),
      );

    this.searchForm.get('text').valueChanges
      .pipe(
        takeUntil(this.cleanUp$.asObservable()),
        debounceTime(250),
      )
      .subscribe(q => {
        this.searchService.searchTextSub.next(q ?? null);
      });

    this.route.queryParamMap
      .pipe(
        takeUntil(this.cleanUp$.asObservable()),
        map(q => q.get('tag')),
        filter(t => !!t),
      )
      .subscribe(tag => {
        this.searchService.searchTextSub.next(tag ?? null);
        this.searchForm.patchValue({
          text: tag,
        });
      });
  }

  ngOnDestroy(): void {
    this.cleanUp$.next(true);
    this.cleanUp$.complete();
  }

  private scrollToInput() {
    setTimeout(() => {
      this.searchInput.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }

}
