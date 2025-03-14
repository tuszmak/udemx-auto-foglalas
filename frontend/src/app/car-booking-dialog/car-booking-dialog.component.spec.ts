import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBookingDialogComponent } from './car-booking-dialog.component';

describe('CarBookingDialogComponent', () => {
  let component: CarBookingDialogComponent;
  let fixture: ComponentFixture<CarBookingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarBookingDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
