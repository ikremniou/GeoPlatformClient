import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkClientsComponent } from './work-clients.component';

describe('ClientsComponent', () => {
  let component: WorkClientsComponent;
  let fixture: ComponentFixture<WorkClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
