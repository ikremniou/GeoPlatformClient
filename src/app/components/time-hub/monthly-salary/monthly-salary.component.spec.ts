import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalaryComponent } from './monthly-salary.component';

describe('MonthlySalaryComponent', () => {
  let component: MonthlySalaryComponent;
  let fixture: ComponentFixture<MonthlySalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlySalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
