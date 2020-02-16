import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsesRoutingModule } from './uses-routing.module';
import { UsesComponent } from './uses.component';
import {TagModule} from '../tag/tag.module';
import { ShareSheetModule } from '../share-sheet/share-sheet.module';


@NgModule({
  declarations: [UsesComponent],
  imports: [
    CommonModule,
    UsesRoutingModule,
    TagModule,
    ShareSheetModule
  ],
})
export class UsesModule { }
