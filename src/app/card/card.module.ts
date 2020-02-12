import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from './card.component';
import {TagModule} from '../tag/tag.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ],
  imports: [
    CommonModule,
    TagModule,
    RouterModule,
  ]
})
export class CardModule { }
