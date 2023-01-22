import { TestBed } from '@angular/core/testing';

import { DoctorDashboardGuard } from './doctor-dashboard.guard';

describe('DoctorDashboardGuard', () => {
  let guard: DoctorDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
