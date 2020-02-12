import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsesComponent } from './uses.component';

const routes: Routes = [{ path: '', component: UsesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsesRoutingModule { }
