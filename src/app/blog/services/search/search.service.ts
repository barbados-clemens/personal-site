import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch';
import { environment } from '../../../../environments/environment';
import { of, ReplaySubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchTextSub = new ReplaySubject<string>(1);

  private client = algoliasearch(environment.algolia.apiId, environment.algolia.apiKey);

  private index = this.client.initIndex('Blog_Posts');

  results$ = this.searchTextSub.asObservable()
    .pipe(
      switchMap((query) => !!query ? this.index.search(query) : of(null)),
      catchError(error => of({ error })),
    );

  constructor() {
  }
}


export interface ISearchResult {
  title: string;
  path: string;
  description: string;
  tags: string[];
  date: string;
  id: string;
  objectID: string;
  _highlightResult: {
    title: IMatchedResult
    description: IMatchedResult
    tags: IMatchedResult[]
  };
}

export interface ISearchError {
  error: {};
  name: string;
  message: string;
  status: number;
  transporterStackTrace: [];
}

export interface ISearchStackTrack {
  request: {
    /**
     * JSON encoded string
     */
    data: string;
    headers: {
      'x-algolia-api-key': string,
      'x-algolia-application-id': string;
      'content-type': string;
    };
    method: string;
    url: string;
    connectTimeout: number;
    responseTimeout: number;
  };
  response: {
    /**
     * JSON encoded string
     */
    content: string;
    status: number;
    isTimedOut: boolean;
  };
  host: {
    protocol: 'https' | 'http';
    url: string;
    accept: number;
  };
  triesLeft: number;
}

export interface IMatchedResult {
  /**
   * this will contain the <em></em> marked word
   */
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}
