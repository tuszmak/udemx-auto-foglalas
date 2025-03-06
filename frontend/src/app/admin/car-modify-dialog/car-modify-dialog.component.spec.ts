import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModifyDialogComponent } from './car-modify-dialog.component';

describe('CarModifyDialogComponent', () => {
  let component: CarModifyDialogComponent;
  let fixture: ComponentFixture<CarModifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModifyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
