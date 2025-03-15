import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOnProperty(component, 'searchStart', 'get').and.returnValue(
      new Date('2025-04-01'),
    );
    spyOnProperty(component, 'searchEnd', 'get').and.returnValue(
      new Date('2025-04-10'),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if lastRentStart or lastRentEnd is null', () => {
    expect(component.isCarAvailable(null, new Date())).toBeTrue();
    expect(component.isCarAvailable(new Date(), null)).toBeTrue();
  });

  it('should return true if searchStart or searchEnd is missing', () => {
    expect(component.isCarAvailable(new Date(), new Date())).toBeTrue();
  });

  it('should return true if there is no overlap', () => {
    component.campaignOne.setValue({
      start: new Date('2025-04-01'),
      end: new Date('2025-04-10'),
    });
    expect(
      component.isCarAvailable(new Date('2025-03-01'), new Date('2025-03-10')),
    ).toBeTrue();
  });

  it('should return false if there is overlap', () => {
    component.campaignOne.setValue({
      start: new Date('2025-04-01'),
      end: new Date('2025-04-10'),
    });
    expect(
      component.isCarAvailable(new Date('2025-04-05'), new Date('2025-04-15')),
    ).toBeFalse();
  });
});
