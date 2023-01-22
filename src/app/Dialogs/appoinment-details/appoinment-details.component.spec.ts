import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentDetailsComponent } from './appoinment-details.component';

describe('AppoinmentDetailsComponent', () => {
  let component: AppoinmentDetailsComponent;
  let fixture: ComponentFixture<AppoinmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
