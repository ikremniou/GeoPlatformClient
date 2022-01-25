import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformShutterComponent } from './platform-shutter.component';

describe('PlatformShutterComponent', () => {
  let component: PlatformShutterComponent;
  let fixture: ComponentFixture<PlatformShutterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformShutterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformShutterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
