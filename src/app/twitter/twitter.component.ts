import {Component} from '@angular/core';
import {TwitterService} from './twitter.service';
import {map, tap} from 'rxjs/operators';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss'],
  animations: [
    trigger('fadeSlideUp', [
      transition('*=>*', [
        query(':enter', style({opacity: 0, transform: 'translate(0, 5em)'})),

        query(':enter', stagger('250ms', [
          animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            style({opacity: 1, transform: 'translate(0,0)'})
          )
        ]))
      ])
    ])
  ]
})
export class TwitterComponent {

  tweets$ = this.twitterSrv.getTweets()
    .pipe(
      map(tweets => tweets.map(t => {
        return {
          ...t,
          full_text: `${t.full_text.split('https://t.co')
            .shift()
            .slice(0, 100)}${t.full_text.length >= 100 ? '...' : ''}`
        };

      })),
      tap(t => console.log(t)),
    );

  constructor(
    private twitterSrv: TwitterService
  ) {
  }

}
