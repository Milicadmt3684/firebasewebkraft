// contact.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  createContact(): void {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;
      this.firebaseService.addContact(contactData).then(() => {
        console.log('Contact added successfully');
        this.contactForm.reset();
      }).catch(error => {
        console.error('Error adding contact:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
