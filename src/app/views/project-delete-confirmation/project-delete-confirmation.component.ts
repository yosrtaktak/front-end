import { Component, Inject } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { ButtonModule, ModalBodyComponent, ModalComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalToggleDirective } from '@coreui/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user/user.component';

@Component({
  selector: 'app-project-delete-confirmation',
  standalone: true,
  imports: [ModalComponent,MatSelectModule,MatOptionModule, MatDialogModule, MatFormField, MatInput, MatLabel, 
    ModalHeaderComponent, UserComponent, ModalToggleDirective, ModalDialogComponent, 
    ModalFooterComponent, ModalBodyComponent,ButtonModule, FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './project-delete-confirmation.component.html',
  styleUrl: './project-delete-confirmation.component.scss'
})
export class ProjectDeleteConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<ProjectDeleteConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
