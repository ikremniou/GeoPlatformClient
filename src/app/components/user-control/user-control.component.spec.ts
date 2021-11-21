import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/modules/material.module';

import { UserControlComponent } from './user-control.component';

describe('UserControlComponent', () => {
  let component: UserControlComponent;
  let fixture: ComponentFixture<UserControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserControlComponent],
      imports: [RouterTestingModule, MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
