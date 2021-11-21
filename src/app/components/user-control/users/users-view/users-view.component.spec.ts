import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from 'src/app/components/generic/data-table/data-table.component';
import { MaterialModule } from 'src/app/modules/material.module';

import { UsersViewComponent } from './users-view.component';

describe('UsersViewComponent', () => {
  let component: UsersViewComponent;
  let fixture: ComponentFixture<UsersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersViewComponent, DataTableComponent],
      imports: [HttpClientTestingModule, MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
