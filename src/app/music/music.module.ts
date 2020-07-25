import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { GearComponent } from './gear/gear.component';
import {CardModule} from '../card/card.module';
import {TwitterModule} from '../twitter/twitter.module';


@NgModule({
  declarations: [GearComponent],
  imports: [
    CommonModule,
    MusicRoutingModule,
    CardModule,
    TwitterModule
  ]
})
export class MusicModule { }
