import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IConvertKitFormResponse, NewsletterService} from './newsletter.service';
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

  newsletterForm: FormGroup;

  tagMap$: Observable<any>;
  tagMap: { [name: string]: string };
  @Input()
  tags: string[] = [];
  @Input()
  subFormId = '3957';
  @Input()
  formUrl = 'https://app.convertkit.com/forms/1401295/subscriptions';
  signUpRes: Observable<IConvertKitFormResponse>;

  constructor(
    private fb: FormBuilder,
    private newsletterSrv: NewsletterService,
  ) {
  }

  formattedTags = (tags: string[]): string[] => {
    return tags.map((t) => this.tagMap[t.toLowerCase()]).filter((t) => !!t);
  }

  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', [Validators.required]]
    });

    this.tagMap$ = this.newsletterSrv.getTags()
      .pipe(
        tap((t) => this.tagMap = t),
      );
  }

  submit($event) {
    $event.preventDefault();

    if (!this.newsletterForm.valid) {
      return;
    }
    const data = new FormData($event.target);

    this.signUpRes = this.newsletterSrv.signUp(
      data,
      this.formUrl
    )
      .pipe(
        tap((r) => console.log(r)),
        retryWhen(genericRetryStrategy()),
        catchError((e, c) => {
          console.error(e);
          return of({error: e, ...e});
        }),
        tap((r) => {
          if (r?.consent?.enabled) {
            window.open(r.consent.url);
          }
        })
      );

  }
}
