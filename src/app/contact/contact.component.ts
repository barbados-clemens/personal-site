import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';
import {MetadataService} from '../layout/services/metadata/metadata.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

  @ViewChild('contactFormRef')
  contactFormRef: ElementRef<HTMLFormElement>;

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactFormSrv: ContactService,
    private router: Router,
    private meta: MetadataService,
  ) {
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      msg: ['', [Validators.required]],
      bot: [''],
    });

    this.meta.update({
      title: 'Contact',
      desc: 'Reach out to Caleb with any questions',
      url: 'https://calebukle.com/contact',
    });
  }

  onSubmit(): void {
    if (!this.contactForm.valid) {
      alert('form not valid');
    }

    this.contactFormSrv.submit(this.contactFormRef.nativeElement)
      .subscribe((t) => {
        if (t?.error) {
          alert('Issue submitting form 🙁. Try again.');
        } else {
          console.log(t);
          this.router.navigateByUrl(t?.action ?? '/');
        }
      });
  }

}
