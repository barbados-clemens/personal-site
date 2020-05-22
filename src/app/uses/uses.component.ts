import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MetadataService} from '../layout/services/metadata/metadata.service';

@Component({
  selector: 'app-uses',
  templateUrl: './uses.component.html',
  styleUrls: ['./uses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsesComponent implements OnInit {

  constructor(
    private meta: MetadataService
  ) {
  }

  ngOnInit() {
    this.meta.update({
      title: 'Uses',
      desc: 'See what Caleb uses from software, hardware, and various gear.',
      url: 'https://calebukle.com/uses'
    });
  }

}
