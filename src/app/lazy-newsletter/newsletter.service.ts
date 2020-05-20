import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    accept: 'application/json',
    'cache-control': 'no-cache'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(
    private http: HttpClient
  ) {
  }


  getTags(): Observable<{ [name: string]: string }> {
    return this.http.get<any>('../../assets/tags/tags.json', httpOptions);
  }


  signUp(formData: FormData, url: string): Observable<IConvertKitFormResponse> {
    return this.http.post<IConvertKitFormResponse>(url,
      formData,
      httpOptions
    );
  }
}


export interface IConvertKitFormResponse {
  consent: {
    enabled: boolean;
    url: string;
  };
  status: 'success' | 'error';
  redirect_url: string;
  error?: any;
}
