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
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { getOverlappingDaysInIntervals, interval } from 'date-fns';
import { changeCarState } from '../../lib/cars';
import { cars } from '../../lib/dummyData';
import { BookingData, BookingSchema, Car } from '../../lib/types';
import { CarBookingDialogComponent } from '../car-booking-dialog/car-booking-dialog.component';
import { CarCardComponent } from '../car-card/car-card.component';

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
    CarCardComponent,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },
  ],
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

  get searchStart(): Date | null {
    return this.campaignOne.get('start')?.value ?? null;
  }

  get searchEnd(): Date | null {
    return this.campaignOne.get('end')?.value ?? null;
  }

  ngOnInit(): void {
    this.availableCars.set(this.filterAvailableCars(cars));
    this.campaignOne.valueChanges.subscribe((value) => {
      this.availableCars.set(this.filterAvailableCars(cars));
    });
  }

  private filterAvailableCars(cars: Car[]): Car[] {
    return cars.filter((car) =>
      this.isCarAvailable(car.reservedFrom, car.reservedUntil),
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
        return this.toastService.open(
          'Your booking was cancelled due to this: ' +
            validatedData.error.message,
        );
      }
      if (!bookingStart) {
        return this.toastService.open("There's no booking start date.");
      }

      const bookingData = validatedData.data;
      changeCarState(carToBeBooked, bookingData, bookingStart);

      bookingData.price = carToBeBooked.dailyPrice * bookingData.daysToRent;
      const response = mockPostToBackend(bookingData);
      if (!response.success) {
        return this.toastService.open('Booking unsuccessful.');
      }

      this.toastService.open('Booking successful!');
      this.availableCars.set(this.filterAvailableCars(cars));
      return;
    });
  }

  isCarAvailable(lastRentStart: Date | null, lastRentEnd: Date | null) {
    if (!lastRentStart || !lastRentEnd) {
      return true;
    }

    const searchStart = this.searchStart;
    const searchEnd = this.searchEnd;
    if (!searchStart || !searchEnd) {
      return true;
    }

    const rentInterval = interval(searchStart, searchEnd);
    const carInterval = interval(lastRentStart, lastRentEnd);

    return getOverlappingDaysInIntervals(rentInterval, carInterval) === 0;
  }
}

function mockPostToBackend(data: BookingData) {
  return { success: true };
}
