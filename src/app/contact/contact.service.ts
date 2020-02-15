import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ContactForm {
  honeyPot: any;
  name: string;
  email: string;
  msg: string;

}

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(
    private http: HttpClient,
  ) {
  }

  submit(form: HTMLFormElement) {
    const data = new FormData(form);

    data.append('form-name', form.getAttribute('name'));

    return this.http.post<any>(form.getAttribute('name'), data);

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
