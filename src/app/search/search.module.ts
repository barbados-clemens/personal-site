import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { CardModule } from '../card/card.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
