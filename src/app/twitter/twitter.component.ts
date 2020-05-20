import {Component} from '@angular/core';
import {TwitterService} from './twitter.service';
import {map, tap} from 'rxjs/operators';
import {animate, query, stagger, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {staggerEnter} from '../../animations/animations';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss'],
  animations: [
    trigger('fadeSlideUp', [
      transition(':enter', [
        useAnimation(staggerEnter, {
          params: {
            transform: 'translate(0,5em)'
          }
        })
      ])
    ])
  ]
})
export class TwitterComponent {

  tweets$ = this.twitterSrv.getTweets()
    .pipe(
      map((tweets) => tweets.map((t) => {
        return {
          ...t,
          full_text: `${t.full_text.split('https://t.co')
            .shift()
            .slice(0, 100)}${t.full_text.length >= 100 ? '...' : ''}`
        };

      })),
      tap((t) => console.log(t)),
    );

  constructor(
    private twitterSrv: TwitterService
  ) {
  }

}
