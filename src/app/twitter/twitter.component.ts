import {Component, Input, OnInit} from '@angular/core';
import {TwitterService} from './twitter.service';
import {map} from 'rxjs/operators';
import {transition, trigger, useAnimation} from '@angular/animations';
import {staggerEnter} from '../../animations/animations';
import {Observable} from 'rxjs';
import {Tweet} from './tweet/tweet.component';

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
export class TwitterComponent implements OnInit {


  @Input()
  tags: string[];

  tweets$: Observable<Tweet[]>;

  constructor(
    private twitterSrv: TwitterService
  ) {
  }

  ngOnInit(): void {
    this.tweets$ = this.twitterSrv.getTweets(this.tags)
      .pipe(
        map((tweets) => tweets.map((t) => {
          return {
            ...t,
            full_text: `${t.full_text.split('https://t.co')
              .shift()
              .slice(0, 100)}${t.full_text.length >= 100 ? '...' : ''}`
          };

        })),
      );
  }

}
