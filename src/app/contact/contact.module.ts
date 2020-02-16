import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThanksComponent } from './thanks/thanks.component';
import { CardModule } from '../card/card.module';


@NgModule({
  declarations: [ContactComponent, ThanksComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    CardModule,
  ],
})
export class ContactModule { }
