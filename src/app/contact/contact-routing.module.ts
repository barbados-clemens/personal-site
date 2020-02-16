import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './contact.component';
import { ThanksComponent } from './thanks/thanks.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'thanks', component: ThanksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {
}
