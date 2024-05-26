import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRappConfComponent } from './delete-rapp-conf.component';

describe('DeleteRappConfComponent', () => {
  let component: DeleteRappConfComponent;
  let fixture: ComponentFixture<DeleteRappConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRappConfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteRappConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
