import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(
    private http: HttpClient,
  ) {
  }

  submit(form: HTMLFormElement): Observable<any> {
    const data = new FormData(form);

    data.append('form-name', form.getAttribute('name'));

    // @ts-ignore
    return this.http.post<any>(form.getAttribute('name'), data, { responseType: 'text' })
      .pipe(
        map((_) => {
          return {
            action: form.getAttribute('action'),
          };
        }),
        catchError((e) => {
          console.error('issue posting form', e);
          return of({
            error: 'Try Again',
          });
        }),
      );

    // fetch('/', {
    //   method: 'POST',
    //   body: data,
    // })
    //   .then(() => {
    //     this.setState({
    //       isSubmit: true,
    //       isFocus: true,
    //       ...this.state,
    //     });
    //     navigate(form.getAttribute('action'));
    //   })
    //   .catch(error => alert(error));

  }
}
