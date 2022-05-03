import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookingService } from 'src/app/shared/booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings : Array<Book> = [];

  constructor(private bs: BookingService) { }

  ngOnInit(): void {
    this.bs.getAll().subscribe(bookings => {
      this.bookings = bookings;
    })
  }

  deleteBooking(book: Book){
    if(window.confirm('Biztosan törölni akarja ezt az időpontot?')){
      this.bs.delete(book);
    }
  }

}
