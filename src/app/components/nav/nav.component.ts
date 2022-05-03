import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  user?: firebase.default.User | null;
  isAdmin? : boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.loggedUser().subscribe(user => {
      this.user = user;
      if (this.user?.email == 'admin@mail.com'){
        this.isAdmin = true;
      }
    }, err => {
      console.log(err);
    })
  }

  logout(){
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/landing');
      console.log("Logged out");
    }).catch( err => {
      console.log(err);
    });
  }

}
