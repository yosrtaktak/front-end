import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLotTacheComponent } from './delete-lot-tache.component';

describe('DeleteLotTacheComponent', () => {
  let component: DeleteLotTacheComponent;
  let fixture: ComponentFixture<DeleteLotTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLotTacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteLotTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
