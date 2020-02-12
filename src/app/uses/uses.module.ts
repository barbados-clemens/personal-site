import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsesRoutingModule } from './uses-routing.module';
import { UsesComponent } from './uses.component';
import {TagModule} from '../tag/tag.module';


@NgModule({
  declarations: [UsesComponent],
  imports: [
    CommonModule,
    UsesRoutingModule,
    TagModule
  ]
})
export class UsesModule { }
