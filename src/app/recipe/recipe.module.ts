import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';
import { TagModule } from '../tag/tag.module';
import { ShareSheetModule } from '../share-sheet/share-sheet.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeOverviewComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    ScullyLibModule,
    TagModule,
    ShareSheetModule,
    TooltipModule,
    SearchModule,
  ],
})
export class RecipeModule {
}
