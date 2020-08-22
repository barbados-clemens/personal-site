import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tweet} from './tweet/tweet.component';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(
    private http: HttpClient
  ) {
  }


  getTweets(tags: string[]): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`/.netlify/functions/twitter?tags=${tags.join(',')}`);
  }
}
