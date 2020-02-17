import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeComponent } from './recipe.component';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeOverviewComponent,
  },
  {
    path: ':recipe',
    component: RecipeComponent,
  },
  {
    path: '**',
    component: RecipeOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {
}

