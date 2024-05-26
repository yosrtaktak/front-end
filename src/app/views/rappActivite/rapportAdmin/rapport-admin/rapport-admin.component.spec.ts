import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportAdminComponent } from './rapport-admin.component';

describe('RapportAdminComponent', () => {
  let component: RapportAdminComponent;
  let fixture: ComponentFixture<RapportAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RapportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
