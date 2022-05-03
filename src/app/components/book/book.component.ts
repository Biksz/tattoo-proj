import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input-base';
import { Book } from 'src/app/models/Book';
import { User } from 'src/app/models/User';
import { BookingService } from 'src/app/shared/booking.service';
import { UserService } from 'src/app/shared/user.service';

export function mobileFormatChecker(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const mobile = control.get('mobile')?.value as string;
    if (!(mobile.length == 11 || mobile.startsWith('06'))){
      return { notCorrectMobileFormat: true}
    }
    return null;
  };
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  selected : any; //valasztott idopont
  date : any; //valasztott nap
  user? : User;

  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    mobile: new FormControl('', Validators.required),
  },
  {validators: mobileFormatChecker()});

  constructor(private afs: AngularFirestore, private bs: BookingService, private us: UserService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.us.getByID(user.uid).subscribe(data => {
      this.user = data;
      this.bookForm.get('name')?.setValue(this.user?.name);
    }, error => {
      console.log(error);
    })
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 5 && day !== 6;
  };

  addEvent(event: MatDatepickerInputEvent<Date>) {
    let dateDay = (event.value?.getDate() !== undefined ? event.value.getDate() : ((new Date().getDate()))).toString();
    let dateMonth = (event.value?.getMonth() !== undefined ? (event.value?.getMonth())+1 : ((new Date().getMonth()))).toString();
    let dateYear = (event.value?.getFullYear() !== undefined ? event.value.getFullYear() : ((new Date()).getFullYear())).toString();
    let fullDate = dateYear + "-" + dateMonth + "-" + dateDay;
    this.date = fullDate;
  }

  bookSubmit(){
    if(!this.bookForm.valid){
      return;
    }
    const {name, mobile} = this.bookForm.value;
    let randId = this.afs.createId();
    const book : Book = {
      id: randId,
      user: name,
      mobile: mobile,
      date: this.date,
      time: this.selected
    }
    this.bs.create(book).then(_ => {
      alert("Sikeres időpont foglalás, hamarosan keresünk telefonon :)")
    }).catch(err => {
      console.error(err);
      alert("Hiba történt a foglalás során!")
    });
  }

}
