import {Component, OnInit} from '@angular/core';
import {MetadataService} from '../../layout/services/metadata/metadata.service';
import {GearService, IAudioGear, IEnjoyableMusic} from './gear.service';

@Component({
  selector: 'app-gear',
  templateUrl: './gear.component.html',
  styleUrls: ['./gear.component.scss']
})
export class GearComponent implements OnInit {

  gear$ = this.gearSrv.getGear();

  music$ = this.gearSrv.getMusic();

  constructor(
    private meta: MetadataService,
    private gearSrv: GearService
  ) {
  }

  ngOnInit(): void {
    this.meta.update({
      url: 'https://calebukle/music',
      desc: 'Check out my current musical tastes, gear and playlists',
      title: 'Music',
      image: 'https://media.calebukle.com/uploads/2020/07/music-meta-img.jpg',
    });
  }

}
