import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user?: firebase.default.User | null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.loggedUser().subscribe(user => {
      console.log(user);
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
    }, err => {
      console.log(err);
      localStorage.setItem('user', JSON.stringify('null'));
    })
  }

}
