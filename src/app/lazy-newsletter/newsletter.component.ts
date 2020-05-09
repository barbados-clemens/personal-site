import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsletterService} from './newsletter.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  newsletterForm: FormGroup;

  @Input()
  tags: string[] = ['Empty'];

  constructor(
    private fb: FormBuilder,
    private newsletterSrv: NewsletterService,
    private router: Router,
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

    this.newsletterSrv.signUp(
      this.newsletterForm.get('email').value,
      this.newsletterForm.get('bot').value,
      location.href,
    )
      .pipe(
        tap(res => console.log('do some logic', res)),
      )
      .subscribe();
  }
}
