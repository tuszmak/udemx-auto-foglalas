import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnChanges,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';
import { Car } from '../lib/types';
import { CarBookingDialogComponent } from './car-booking-dialog/car-booking-dialog.component';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnChanges {
  availableCars = cars.filter((car) =>
    this.isCarAvailable(car.reservedFrom, car.reservedUntil)
  );

  title = 'frontend';
  readonly rentLength: WritableSignal<number> = signal(0);
  readonly dialog = inject(MatDialog);

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  dateRangeChange() {
    console.log(this.campaignOne.get('start')?.value);
    console.log(this.campaignOne.get('end')?.value);
  }

  isCarAvailable(lastRentStart: Date | null, lastRentEnd: Date | null) {
    if (!lastRentStart || !lastRentEnd) return true;
    else {
      return today > lastRentEnd && today < lastRentStart;
    }
  }

  bookCar(carToBeBooked: Car) {
    const dialogRef = this.dialog.open(CarBookingDialogComponent, {
      data: { car: carToBeBooked },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

const cars: Car[] = [
  {
    type: 'Sedan',
    image: 'https://example.com/sedan-image.jpg', // Placeholder URL for the image
    dailyPrice: 50,
    reservedFrom: new Date('2025-03-10'),
    reservedUntil: new Date('2025-03-15'),
  },
  {
    type: 'SUV',
    image: 'https://example.com/suv-image.jpg', // Placeholder URL for the image
    dailyPrice: 80,
    reservedFrom: null,
    reservedUntil: null,
  },
  {
    type: 'Convertible',
    image: 'https://example.com/convertible-image.jpg', // Placeholder URL for the image
    dailyPrice: 100,
    reservedFrom: new Date('2025-03-20'),
    reservedUntil: new Date('2025-03-25'),
  },
  {
    type: 'Coupe',
    image: 'https://example.com/coupe-image.jpg', // Placeholder URL for the image
    dailyPrice: 70,
    reservedFrom: new Date('2025-03-05'),
    reservedUntil: new Date('2025-03-10'),
  },
  {
    type: 'Hatchback',
    image: 'https://example.com/hatchback-image.jpg', // Placeholder URL for the image
    dailyPrice: 40,
    reservedFrom: null,
    reservedUntil: null,
  },
];
