import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cars } from '../../../lib/dummyData';
import { CarModifyDialogComponent } from './car-modify-dialog.component';

describe('CarModifyDialogComponent', () => {
  let component: CarModifyDialogComponent;
  let fixture: ComponentFixture<CarModifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModifyDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // Mock MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: { car: cars[0] } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
