import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/shared/comment.service';
import { Comment } from 'src/app/models/Comment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  
  comments : Array<Comment> = [];
  displayedColumns: string[] = ['name', 'comment'];
  user?: User;

  commentsForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    comment: new FormControl('', [Validators.required, Validators.minLength(10)])
  })

  constructor(private cs: CommentService, private us: UserService) {
   }

  ngOnInit(): void {
    this.cs.getAll().subscribe(comments => {
      this.comments = comments;
    });
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    if(user){
      this.us.getByID(user.uid).subscribe(data => {
        this.user = data;
        this.commentsForm.get('name')?.setValue(this.user?.name);
      }, error => {
        console.log(error);
      })
    }
  }

  addComment(){
    if(!this.commentsForm.valid){
      return;
    }
    this.cs.create(this.commentsForm.value).then( _=> {
      alert("Köszönjük, hogy írtál rólunk véleményt :)")
    }).catch(err => {
      console.log(err);
      alert("Hiba történt a komment feltöltésekor!");
    });
  }

}
