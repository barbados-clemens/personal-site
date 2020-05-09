import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(
    private http: HttpClient
  ) {
  }


  signUp(email: string, bot: boolean, signUpPage: string): Observable<any> {
    if (bot) {
      return EMPTY;
    }

    const body = {
      email,
      bot,
      signUpPage,
      type: 'signup',
      token: ''
    };

    return this.http.post('/.netlify/functions/newsletter',
      body,
      httpOptions
    );
  }
}
