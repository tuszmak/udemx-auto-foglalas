import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingData, Car } from '../../lib/types';

interface DialogData {
  car: Car;
}

@Component({
  selector: 'app-car-booking-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './car-booking-dialog.component.html',
  styleUrl: './car-booking-dialog.component.css',
})
export class CarBookingDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CarBookingDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  bookingData: BookingData = {
    carName: this.data.car.type,
    name: '',
    email: '',
    location: '',
    phoneNumber: '',
    daysToRent: 0,
    price: 0,
  };

  onNoClick(): void {
    this.dialogRef.close();
  }
}
