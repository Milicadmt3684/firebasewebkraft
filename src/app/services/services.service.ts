import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/compat/database"; // Ispravka importa

export  interface Contact {
  $key: string;
  name: string;
  lastname: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  contactsRef: AngularFireList<any>; // Promenljiva promenjena u contactsRef

  constructor(private db: AngularFireDatabase) { // Ispravka importa
    this.contactsRef = db.list('/contacts'); // Promenljiva promenjena u contactsRef
  }

  AddContact(contact: Contact): void {
    this.contactsRef.push({
      name: contact.name,
      lastname: contact.lastname,
      email: contact.email,
      message: contact.message
    });
  }
}

