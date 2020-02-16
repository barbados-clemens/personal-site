import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uses',
  templateUrl: './uses.component.html',
  styleUrls: ['./uses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsesComponent {

  constructor() { }

}
