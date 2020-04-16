import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  constructor() {
  }

  parseDateToTitle(date: string): string {
    return new Intl.DateTimeFormat(
      navigator.language,
      {month: 'long', year: 'numeric'}
    )
      .format(new Date(date));
  }
}
