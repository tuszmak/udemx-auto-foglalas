import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { getOverlappingDaysInIntervals, interval } from 'date-fns';
import { changeCarState } from '../../lib/cars';
import { cars } from '../../lib/dummyData';
import { BookingData, BookingSchema, Car } from '../../lib/types';
import { CarBookingDialogComponent } from '../car-booking-dialog/car-booking-dialog.component';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-homepage',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  availableCars = signal<Car[]>([]);

  readonly rentLength: WritableSignal<number> = signal(0);
  readonly dialogService = inject(MatDialog);
  readonly toastService = inject(MatSnackBar);

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  ngOnInit(): void {
    this.availableCars.set(this.filterAvailableCars(cars));
    this.campaignOne.valueChanges.subscribe((value) => {
      this.availableCars.set(this.filterAvailableCars(cars));
    });
  }

  private filterAvailableCars(cars: Car[]): Car[] {
    return cars.filter((car) =>
      this.isCarAvailable(car.reservedFrom, car.reservedUntil)
    );
  }

  bookCar(carToBeBooked: Car) {
    const dialogRef = this.dialogService.open(CarBookingDialogComponent, {
      data: { car: carToBeBooked },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      const validatedData = BookingSchema.safeParse(result);
      const bookingStart = this.campaignOne.get('start')?.value;
      if (validatedData.error) {
        this.toastService.open(
          'Your booking was cancelled due to this: ' +
            validatedData.error.message
        );
      } else if (!bookingStart) {
        this.toastService.open("There's no booking start date.");
      } else {
        const bookingData = validatedData.data;
        changeCarState(carToBeBooked, bookingData, bookingStart);
        console.log(carToBeBooked);

        bookingData.price = carToBeBooked.dailyPrice * bookingData.daysToRent;
        const response = mockPostToBackend(bookingData);
        if (response.success) {
          this.toastService.open('Booking successful!');
          this.availableCars.set(this.filterAvailableCars(cars));
        } else {
          this.toastService.open('Booking unsuccessful.');
        }
      }
    });
  }

  isCarAvailable(lastRentStart: Date | null, lastRentEnd: Date | null) {
    if (!lastRentStart || !lastRentEnd) return true;
    const searchStart = this.campaignOne.get('start')?.value;
    const searchEnd = this.campaignOne.get('end')?.value;
    if (!searchStart || !searchEnd) return false;
    else {
      const rentInterval = interval(searchStart, searchEnd);
      const carInterval = interval(lastRentStart, lastRentEnd);
      return getOverlappingDaysInIntervals(rentInterval, carInterval) === 0;
    }
  }
}

function mockPostToBackend(data: BookingData) {
  return { success: true };
}
