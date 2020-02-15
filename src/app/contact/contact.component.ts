import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  @ViewChild('contactFormRef')
  contactFormRef: ElementRef<HTMLFormElement>;

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactFormSrv: ContactService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      msg: ['', [Validators.required]],
      bot: [''],
    });
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      alert('form not valid');
    }

    this.contactFormSrv.submit(this.contactFormRef.nativeElement)
      .subscribe(t => {
        if (t?.error) {
          alert('error. check console');
        } else {
          console.log(t);
          alert('submit form');
          this.router.navigateByUrl(t?.action ?? '/');
        }
      });
  }

}
