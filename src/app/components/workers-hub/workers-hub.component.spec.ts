import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersHubComponent } from './workers-hub.component';

describe('WorkersHubComponent', () => {
  let component: WorkersHubComponent;
  let fixture: ComponentFixture<WorkersHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
