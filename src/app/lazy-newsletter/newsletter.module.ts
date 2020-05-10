import {NewsletterComponent} from './newsletter.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
    NewsletterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    NewsletterComponent
  ]
})
export class NewsletterModule {
}
