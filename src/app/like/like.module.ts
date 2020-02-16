import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeUiComponent } from './like-ui.component';
import { TooltipModule } from '../tooltip/tooltip.module';



@NgModule({
  declarations: [LikeUiComponent],
  imports: [
    CommonModule,
    TooltipModule,
  ],
  exports: [
    LikeUiComponent,
  ],
})
export class LikeModule { }
