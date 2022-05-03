import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private afs: AngularFirestore) { }

  create(book: Book){
    return this.afs.collection<Book>('Bookings').doc(book.id).set(book);
  }

  getAll(){
    return this.afs.collection<Book>('Bookings').valueChanges();
  }

  update(book: Book){
    return this.afs.collection<Book>('Bookings').doc(book.id).set(book);
  }

  delete(book: Book){
    return this.afs.doc('Bookings/'+book.id).delete();
  }
}
