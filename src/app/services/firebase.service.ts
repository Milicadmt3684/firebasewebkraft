// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private basePath = '/contacts';

  constructor(private db: AngularFireDatabase) {}

  addContact(contact: any): Promise<void> {
    return this.db.list(this.basePath).push(contact);
  }

  getContacts(): Observable<any[]> {
    return this.db.list(this.basePath).valueChanges();
  }
}
