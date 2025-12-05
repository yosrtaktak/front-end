import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUserMensuelleComponent } from './dash-user-mensuelle.component';

describe('DashUserMensuelleComponent', () => {
  let component: DashUserMensuelleComponent;
  let fixture: ComponentFixture<DashUserMensuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashUserMensuelleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashUserMensuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
