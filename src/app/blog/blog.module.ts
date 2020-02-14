import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { ShareSheetComponent } from './components/share-sheet/share-sheet.component';
import { HeaderComponent } from './components/header/header.component';
import { TagModule } from '../tag/tag.module';
import { BlogOverviewComponent } from './components/blog-overview/blog-overview.component';
import { SearchComponent } from './components/search/search.component';
import { CardModule } from '../card/card.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BlogComponent,
    ShareSheetComponent,
    HeaderComponent,
    BlogOverviewComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ScullyLibModule,
    TagModule,
    CardModule,
    ReactiveFormsModule,
  ],
})
export class BlogModule {
}
