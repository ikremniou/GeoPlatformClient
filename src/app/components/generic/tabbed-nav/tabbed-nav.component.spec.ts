import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedNavComponent } from './tabbed-nav.component';

describe('TabbedNavComponent', () => {
  let component: TabbedNavComponent;
  let fixture: ComponentFixture<TabbedNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabbedNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
