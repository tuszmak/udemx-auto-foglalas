import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Car } from '../../lib/types';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return undefined if no result is provided', () => {
    expect(component.createNewCarObject()).toBeUndefined();
  });

  it('should create a car object with default values when properties are missing', () => {
    const result = component.createNewCarObject({} as Car);
    expect(result).toEqual({
      type: 'No name',
      image: '',
      dailyPrice: 0,
      reservedFrom: null,
      reservedUntil: null,
    });
  });

  it('should create a car object with provided values', () => {
    const input: Car = {
      type: 'Sedan',
      image: 'car.jpg',
      dailyPrice: 50,
    } as Car;
    const result = component.createNewCarObject(input);
    expect(result).toEqual({
      type: 'Sedan',
      image: 'car.jpg',
      dailyPrice: 50,
      reservedFrom: null,
      reservedUntil: null,
    });
  });
});
