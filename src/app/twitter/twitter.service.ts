import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tweet} from './tweet/tweet.component';
import {AngularFireFunctions} from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(
    private aFunc: AngularFireFunctions
  ) {
  }


  getTweets(): Observable<Tweet[]> {
    const func = this.aFunc.httpsCallable('getTweets');
    return func({count: 3});
  }
}
