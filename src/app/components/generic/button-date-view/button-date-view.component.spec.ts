import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDateViewComponent } from './button-date-view.component';

describe('ButtonDateViewComponent', () => {
  let component: ButtonDateViewComponent;
  let fixture: ComponentFixture<ButtonDateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDateViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
