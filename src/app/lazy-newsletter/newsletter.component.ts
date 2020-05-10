import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsletterService} from './newsletter.service';
import {catchError, retryWhen, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {genericRetryStrategy} from '../services/genericRetry.strategy';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsletterComponent implements OnInit {

  isLoading = false;
  newsletterForm: FormGroup;

  signUpRes: Observable<any>;

  @Input()
  tags: string[] = ['Empty'];

  constructor(
    private fb: FormBuilder,
    private newsletterSrv: NewsletterService,
  ) {
  }

  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.email]],
      bot: [false]
    });
  }

  submit() {
    if (!this.newsletterForm.valid) {
      return;
    }
    this.isLoading = true;

    this.signUpRes = this.newsletterSrv.signUp(
      this.newsletterForm.get('email').value,
      this.newsletterForm.get('bot').value,
      location.href,
    )
      .pipe(
        tap(r => console.log(r)),
        retryWhen(genericRetryStrategy()),
        catchError((e, c) => {
          console.error(e);
          return of({error: e, ...e});
        }),
        tap(_ => this.isLoading = false)
      );
  }
}
