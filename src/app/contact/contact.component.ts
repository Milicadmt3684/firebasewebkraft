// contact.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from "../services/services.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  errorContactMessage: string = '';
  successContactMessage: string = '';
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private servicesService: ServicesService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, this.emailValidator]],
      message: ['', Validators.required],
    });
  }

  createContact(): void {
    if (this.contactForm.valid) {
      console.log('Forma je validna.');
      this.servicesService.AddContact(this.contactForm.value); // Dodat poziv servisa
      this.successContactMessage = 'Poruka uspešno poslata.';
    } else {
      this.errorContactMessage = 'Ponovi unos.';
      console.log('Forma nije validna.');
    }
  }

  // Sinhroni validator za e-mail
  emailValidator(control: any): { [key: string]: any } | null {
    const valid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(control.value);
    return valid ? null : { 'invalidEmail': true };
  }
}
