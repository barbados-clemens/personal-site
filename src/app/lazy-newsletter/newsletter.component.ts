import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  email = this.fb.control('', [Validators.email]);

  @Input()
  tags: string[] = ['Something'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.email.valid) {
      return;
    }
    console.log(this.email.value, this.tags);
  }
}
