import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDemandDetailsComponent } from './get-demand-details.component';

describe('GetDemandDetailsComponent', () => {
  let component: GetDemandDetailsComponent;
  let fixture: ComponentFixture<GetDemandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDemandDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDemandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
