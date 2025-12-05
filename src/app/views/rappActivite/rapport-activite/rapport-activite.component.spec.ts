import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportActiviteComponent } from './rapport-activite.component';

describe('RapportActiviteComponent', () => {
  let component: RapportActiviteComponent;
  let fixture: ComponentFixture<RapportActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportActiviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RapportActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
