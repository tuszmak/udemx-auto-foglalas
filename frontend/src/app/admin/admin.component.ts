import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { cars, dummyBookingData } from '../../lib/dummyData';
import { Car } from '../../lib/types';
import { CarModifyDialogComponent } from './car-modify-dialog/car-modify-dialog.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-admin',
  imports: [
    LoginComponent,
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  loginData = localStorage.getItem('userName');
  readonly panelOpenState = signal(false);
  readonly dialogService = inject(MatDialog);

  bookings = dummyBookingData;
  cars = cars;
  displayedColumns = Object.keys(this.bookings[0]);

  openDialog(car: Car) {
    console.log(car);

    const dialogRef = this.dialogService.open(CarModifyDialogComponent, {
      data: {
        car: car,
      },
    });
    dialogRef.afterClosed().subscribe((result: Partial<Car>) => {
      /* Itt ketféle megoldás lehet, backendtől függően.
      1. A frontenden csomagolok össze egy teljes kocsit, elküldöm backendre és az berakja a DB-be.
      2. Egy Partial kocsit adok vissza, és majd a backend ALTER SQL-el átírja, ami nem null. 
      Én ezt fogom megcsinálni, mert a kliensnek kevesebb data.
      */
      car.dailyPrice = result.dailyPrice ?? car.dailyPrice;
      car.type = result.type ?? car.type;
    });
  }
}
