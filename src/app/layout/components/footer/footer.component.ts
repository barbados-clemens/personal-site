import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../contact/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  thisYear = Date.now();

  @ViewChild('newsletterFormRef')
  newsletterFormRef: ElementRef<HTMLFormElement>;

  newsletterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactSrv: ContactService,
  ) {
  }

  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      bot: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (!this.newsletterForm.valid) {
      alert('Form invalid. Try again');
    }

    this.contactSrv.submit(this.newsletterFormRef.nativeElement)
      .subscribe(t => {
        if (t?.error) {
          alert('Issue submitting form 🙁. Try again.');
          console.warn(t.error);
        } else {
          console.log(t);
          // TODO show some confetti for something idk
        }
      });
  }
}
