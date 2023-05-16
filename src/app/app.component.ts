import { Component, OnInit } from '@angular/core';
import { Sequelize } from 'sequelize';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seats: Array<boolean> = Array(80).fill(true);

  number: number = 0;
  errorMessage: String;
  

  constructor() { }

  ngOnInit() { }

  reserveSeats(number: number) {
    if (number > this.seats.length) {
      throw new Error('Not enough seats available');
    }

    for (let i = 0; i < number; i++) {
      this.seats[i] = false;
    }
  }
  

  printSeatAvailability() {
    for (let i = 0; i < this.seats.length; i++) {
      console.log('Row {}: {}', i + 1, this.seats[i] ? 'O' : 'X');
    }
  }

  onSubmit(event: Event) {
    if (this.number <= 0) {
      this.errorMessage = 'Number of seats must be greater than 0';
    } else if (this.number > 7) {
      this.errorMessage = 'Number of seats must be less than or equal to 7';
    } else {
      this.reserveSeats(this.number);
    }
    

    

    try {
      this.reserveSeats(this.number);
    } catch (error) {
      console.error(error);
    }

    this.printSeatAvailability();
  }

}
