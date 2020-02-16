import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BlogComponent} from './blog.component';
import {BlogOverviewComponent} from './components/blog-overview/blog-overview.component';

const routes: Routes = [
  {
    path: '',
    component: BlogOverviewComponent
  },
  {
    path: ':slug',
    component: BlogComponent,
  },
  {
    path: '**',
    component: BlogOverviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

