import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(
    private http: HttpClient
  ) {
  }

  verify(token: string): Observable<any> {
    const body = {
      token,
      email: '',
      signUpPage: '',
      bot: false,
      type: 'check',
    };
    return this.http.post(`/.netlify/functions/newsletter`, body, httpOptions);
  }
}
