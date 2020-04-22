import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwitterComponent } from './twitter.component';
import { TweetComponent } from './tweet/tweet.component';



@NgModule({
  declarations: [TwitterComponent, TweetComponent],
  exports: [
    TwitterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TwitterModule { }
