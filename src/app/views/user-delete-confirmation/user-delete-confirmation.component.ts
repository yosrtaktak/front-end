import { Component, Inject } from '@angular/core';
import { ModalDialogComponent,ModalComponent,ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent, ButtonModule, ModalToggleDirective } from '@coreui/angular';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { UserComponent } from '../user/user/user.component';
@Component({
  selector: 'app-user-delete-confirmation',
  standalone: true,
  imports: [ModalComponent,MatSelectModule,MatOptionModule, MatDialogModule, MatFormField, MatInput, MatLabel, 
    ModalHeaderComponent, UserComponent, ModalToggleDirective, ModalDialogComponent, 
    ModalFooterComponent, ModalBodyComponent,ButtonModule, FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './user-delete-confirmation.component.html',
  styleUrl: './user-delete-confirmation.component.scss'
})
export class UserDeleteConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<UserDeleteConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  console.log("daata",this.data)
  }
  onCancel() {
    this.dialogRef.close();
  }

}
