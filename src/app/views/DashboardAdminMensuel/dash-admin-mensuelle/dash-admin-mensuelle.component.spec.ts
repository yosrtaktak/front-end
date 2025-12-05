import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAdminMensuelleComponent } from './dash-admin-mensuelle.component';

describe('DashAdminMensuelleComponent', () => {
  let component: DashAdminMensuelleComponent;
  let fixture: ComponentFixture<DashAdminMensuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashAdminMensuelleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashAdminMensuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
