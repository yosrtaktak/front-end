import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActComponent } from './delete-act.component';

describe('DeleteActComponent', () => {
  let component: DeleteActComponent;
  let fixture: ComponentFixture<DeleteActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
