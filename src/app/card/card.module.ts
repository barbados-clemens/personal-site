import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from './card.component';
import {TagModule} from '../tag/tag.module';
import {RouterModule} from '@angular/router';
import { SearchResultCardComponent } from './search-result-card/search-result-card.component';

@NgModule({
  declarations: [
    CardComponent,
    SearchResultCardComponent
  ],
  exports: [
    CardComponent,
    SearchResultCardComponent,
  ],
  imports: [
    CommonModule,
    TagModule,
    RouterModule,
  ]
})
export class CardModule { }
