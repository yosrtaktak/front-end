import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogEdComponent } from './project-dialog-ed.component';

describe('ProjectDialogEdComponent', () => {
  let component: ProjectDialogEdComponent;
  let fixture: ComponentFixture<ProjectDialogEdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDialogEdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectDialogEdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
