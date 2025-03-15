import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCardComponent } from './car-card.component';

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarCardComponent);
    component = fixture.componentInstance;
    component.car = {
      type: '',
      dailyPrice: 0,
      image: '',
      reservedFrom: null,
      reservedUntil: null,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
