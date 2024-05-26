import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActDialogComponent } from './add-act-dialog.component';

describe('AddActDialogComponent', () => {
  let component: AddActDialogComponent;
  let fixture: ComponentFixture<AddActDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddActDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddActDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
