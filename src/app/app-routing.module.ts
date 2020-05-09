import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
  },
  {
    path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'uses', loadChildren: () => import('./uses/uses.module').then(m => m.UsesModule),
  },
  {
    path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'verify', loadChildren: () => import('./verify/verify.module').then(m => m.VerifyModule)
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
