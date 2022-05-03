import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore) { }

  create(comment: Comment){
    return this.afs.collection<Comment>('Comments').doc(comment.id).set(comment);
  }

  getAll(){
    return this.afs.collection<Comment>('Comments').valueChanges();
  }
}
