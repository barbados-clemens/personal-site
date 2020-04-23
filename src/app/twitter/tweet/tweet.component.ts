import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent {

  @Input()
  tweet: Tweet;

  constructor() {
  }
}

export interface Tweet {
  created_at: string;
  id: number;
  /**
   * use this for linking to tweet
   */
  id_str: string;
  full_text: string;
  retweet_count: number;
  favorite_count: number;
  entities: {
    media: TweetMedia[];
  };
}

interface TweetMedia {
  id: number;
  media_url_https: string;
  type: string;
  sizes: { [size: string]: TweetMediaSize };
}

interface TweetMediaSize {
  w: number;
  h: number;
  resize: string;
}
