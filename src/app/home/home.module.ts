import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {CardModule} from '../card/card.module';
import {TagModule} from '../tag/tag.module';
import {TwitterModule} from '../twitter/twitter.module';


@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CardModule,
        TagModule,
        TwitterModule,
    ]
})
export class HomeModule { }
