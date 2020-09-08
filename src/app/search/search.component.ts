import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { noop, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchService],
})
export class SearchComponent implements AfterContentInit, OnDestroy {
  @ViewChild('searchInput')
  searchInput: ElementRef;

  @Input()
  index: string;

  searchForm: FormGroup;
  searchResults$: Observable<any>;

  cleanUp$ = new Subject();

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
  }

  ngAfterContentInit(): void {

    this.searchService.initIndex(this.index);
    this.searchForm = this.fb.group({
      text: [''],
    });

    this.searchResults$ = this.searchService.results$
      .pipe(
        takeUntil(this.cleanUp$.asObservable()),
        tap((r) => !!r ? this.scrollToInput() : noop()),
      );

    this.searchForm.get('text').valueChanges
      .pipe(
        takeUntil(this.cleanUp$.asObservable()),
        debounceTime(250),
      )
      .subscribe((q) => {
        this.searchService.searchTextSub.next(q ?? null);
      });

    this.route.queryParamMap
      .pipe(
        takeUntil(this.cleanUp$.asObservable()),
        map((q) => q.get('tag')),
        filter((t) => !!t),
      )
      .subscribe((tag) => {
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

  private scrollToInput(): void {
    setTimeout(() => {
      this.searchInput.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }

}
