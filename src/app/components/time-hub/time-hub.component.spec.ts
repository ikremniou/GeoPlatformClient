import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeHubComponent } from './time-hub.component';

describe('TimeHubComponent', () => {
  let component: TimeHubComponent;
  let fixture: ComponentFixture<TimeHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
