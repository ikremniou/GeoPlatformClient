import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/modules/material.module';

import { EntityDialogComponent } from './entity-dialog.component';

describe('EntityDialogComponent', () => {
  let component: EntityDialogComponent<any>;
  let fixture: ComponentFixture<EntityDialogComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityDialogComponent],
      imports: [MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDialogComponent);
    component = fixture.componentInstance;
    component.dialogData = {
      title: 'Sample Dialog',
      form: {
        type: {
          isView: true,
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
