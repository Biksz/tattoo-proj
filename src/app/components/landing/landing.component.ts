import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/shared/user.service';

export function passwordMatcher(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if( password && confirmPassword && password !== confirmPassword){
      return { passwordsDontMatch: true}
    }
    return null;
  };
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  regForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  },
  {validators: passwordMatcher()});

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.switchSignUp();
    this.switchSignIn();
  }

  switchSignUp(){
    const container = document.querySelector('.container');
    container?.classList.add('sign-up-mode');
  }

  switchSignIn(){
    const container = document.querySelector('.container');
    container?.classList.remove('sign-up-mode');
  }

  loginSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/dashboard');
    }).catch(err => {
      console.error(err);
      alert("Hiba történt a bejelentkezés során!");
    });
  }

  regSubmit(){
    if(!this.regForm.valid){
      return;
    }
    const { email, password } = this.regForm.value;
    this.authService.signup(email, password).then(cred => {
      console.log(cred);
      const user : User = {
        id: cred.user?.uid as string,
        email: email,
        name: this.regForm.get('name')?.value,
        admin: false
      };
      this.userService.create(user).then(_ => {
        console.log("User added");
      }). catch(err => {
        console.error(err);
      })
      this.router.navigateByUrl('/dashboard');
    }).catch(err => {
      console.log(err);
      alert("Hiba történt a regisztráció során!")
    })
  }

  anonymusLogin(){
    this.router.navigateByUrl('/dashboard');
  }

  get loginEmail(){
    return this.loginForm.get('email');
  }

  get loginPassword(){
    return this.loginForm.get('password');
  }

  get regName(){
    return this.regForm.get('name');
  }

  get regEmail(){
    return this.regForm.get('email');
  }

  get regPassword(){
    return this.regForm.get('password');
  }

  get confPassword(){
    return this.regForm.get('confirmPassword');
  }

}
