import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Car } from '../../../lib/types';

@Component({
  selector: 'app-car-modify-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './car-modify-dialog.component.html',
  styleUrl: './car-modify-dialog.component.css',
})
export class CarModifyDialogComponent {
  readonly car = inject<Car>(MAT_DIALOG_DATA);

  modifiedCar: Car = {
    dailyPrice: this.car.dailyPrice,
    image: this.car.image,
    reservedFrom: this.car.reservedFrom,
    reservedUntil: this.car.reservedUntil,
    type: this.car.type,
  };
}
