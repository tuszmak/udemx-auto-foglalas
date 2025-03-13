import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { cars } from '../../../lib/dummyData';
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
export class CarModifyDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CarModifyDialogComponent>);
  readonly data = inject<{ car?: Car }>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log(this.data.car);
  }

  modifiedCar: Car = this.data?.car
    ? {
        dailyPrice: this.data.car.dailyPrice,
        image: this.data.car.image,
        reservedFrom: this.data.car.reservedFrom,
        reservedUntil: this.data.car.reservedUntil,
        type: this.data.car.type,
      }
    : {
        dailyPrice: 0,
        image: '',
        reservedFrom: null,
        reservedUntil: null,
        type: '',
      };

  removeCar(type: string) {
    cars.splice(cars.findIndex((car) => car.type === type));
  }
}
