import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cars } from '../../lib/dummyData';
import { CarBookingDialogComponent } from './car-booking-dialog.component';

describe('CarBookingDialogComponent', () => {
  let component: CarBookingDialogComponent;
  let fixture: ComponentFixture<CarBookingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarBookingDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // Mock MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: { car: cars[0] } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
