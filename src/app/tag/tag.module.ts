import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TagsComponent} from './tags.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    TagsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TagsComponent
  ]
})
export class TagModule { }
