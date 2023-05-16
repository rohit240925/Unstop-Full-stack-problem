import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sequelize } from 'sequelize';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  number: number;
  seats: Array<boolean> = Array(10).fill(true);
  errorMessage: string;

  constructor(private sequelize: Sequelize) {}

  ngOnInit() {}

  onSubmit() {
    if (this.number <= 0) {
      this.errorMessage = 'Number of seats must be greater than 0';
    } else if (this.number > 7) {
      this.errorMessage = 'Number of seats must be less than or equal to 7';
    } else {
      this.reserveSeats(this.number);
    }
  }

  reserveSeats(number) {
    for (let i = 0; i < number; i++) {
      this.seats[i] = false;
    }

    this.sequelize
      .query('UPDATE seats SET reserved = true WHERE id IN (?)')
      .then(() => {
        console.log('Seats reserved');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
