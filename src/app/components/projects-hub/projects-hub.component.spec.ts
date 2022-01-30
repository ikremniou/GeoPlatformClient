import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsHubComponent } from './projects-hub.component';

describe('ProjectsHubComponent', () => {
  let component: ProjectsHubComponent;
  let fixture: ComponentFixture<ProjectsHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
