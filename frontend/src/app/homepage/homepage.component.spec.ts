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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if lastRentStart or lastRentEnd is null', () => {
    expect(component.isCarAvailable(null, new Date())).toBeTrue();
    expect(component.isCarAvailable(new Date(), null)).toBeTrue();
  });

  it('should return true if searchStart or searchEnd is null', () => {
    spyOnProperty(component, 'searchStart', 'get').and.returnValue(null);
    expect(component.isCarAvailable(new Date(), new Date())).toBeTrue();

    spyOnProperty(component, 'searchEnd', 'get').and.returnValue(null);
    expect(component.isCarAvailable(new Date(), new Date())).toBeTrue();
  });

  it('should return true if there is no overlap between rental and search intervals', () => {
    const lastRentStart = new Date('2025-04-11');
    const lastRentEnd = new Date('2025-04-15');
    expect(component.isCarAvailable(lastRentStart, lastRentEnd)).toBeTrue();
  });

  it('should return false if there is an overlap between rental and search intervals', () => {
    spyOnProperty(component, 'searchStart', 'get').and.returnValue(
      new Date('2025-04-01'),
    );
    spyOnProperty(component, 'searchEnd', 'get').and.returnValue(
      new Date('2025-04-10'),
    );
    const lastRentStart = new Date('2025-04-05');
    const lastRentEnd = new Date('2025-04-15');

    expect(component.isCarAvailable(lastRentStart, lastRentEnd)).toBeFalse();
  });
});
