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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { cars } from '../../lib/cars';
import { BookingSchema, Car } from '../../lib/types';
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
export class HomepageComponent implements OnChanges {
  availableCars = cars.filter((car) =>
    this.isCarAvailable(car.reservedFrom, car.reservedUntil)
  );

  title = 'frontend';
  readonly rentLength: WritableSignal<number> = signal(0);
  readonly dialogService = inject(MatDialog);
  readonly toastService = inject(MatSnackBar);

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
    const dialogRef = this.dialogService.open(CarBookingDialogComponent, {
      data: { car: carToBeBooked },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        const validatedData = BookingSchema.safeParse(result);
        if (validatedData.error) {
          this.toastService.open(
            'Your booking was cancelled due to this: ' +
              validatedData.error.message
          );
        } else {
          this.toastService.open('Booking successful!');
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
