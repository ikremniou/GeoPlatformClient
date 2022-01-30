import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkClientFormComponent } from './work-client-form.component';

describe('WorkClientFormComponent', () => {
  let component: WorkClientFormComponent;
  let fixture: ComponentFixture<WorkClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkClientFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
