import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GearService {
  constructor(
    private http: HttpClient
  ) {
  }


  getGear(): Observable<IAudioGear[]> {
    return this.http.get<IAudioGear[]>(`../../../assets/audio/gear.json`);
  }

  getMusic(): Observable<IEnjoyableMusic[]> {
    return  this.http.get<IEnjoyableMusic[]>(`../../../assets/audio/music.json`);
  }
}


export interface IAudioGear {
  type: string;
  name: string;
  link: string;
  img: string;
  desc: string;
}

export interface IEnjoyableMusic {
  name: string;
  img: string;
  links: IMusicService[];
}

export interface IMusicService {
  service: string;
  link: string;
}
