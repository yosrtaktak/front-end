import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotTacheComponent } from './lot-tache.component';

describe('LotTacheComponent', () => {
  let component: LotTacheComponent;
  let fixture: ComponentFixture<LotTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotTacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LotTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
