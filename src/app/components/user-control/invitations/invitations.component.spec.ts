import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/modules/material.module';
import { DataTableComponent } from '../../generic/data-table/data-table.component';

import { InvitationsComponent } from './invitations.component';

describe('InvitationsComponent', () => {
  let component: InvitationsComponent;
  let fixture: ComponentFixture<InvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitationsComponent, DataTableComponent],
      imports: [MaterialModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
