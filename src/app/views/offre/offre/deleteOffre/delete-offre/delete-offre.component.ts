import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { ButtonModule, ModalBodyComponent, ModalComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalToggleDirective } from '@coreui/angular';

@Component({
  selector: 'app-delete-offre',
  standalone: true,
  imports: [ModalComponent,MatSelectModule,MatOptionModule, MatDialogModule, MatFormField, MatInput, MatLabel, 
    ModalHeaderComponent,  ModalToggleDirective, ModalDialogComponent, 
    ModalFooterComponent, ModalBodyComponent,ButtonModule, FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './delete-offre.component.html',
  styleUrl: './delete-offre.component.scss'
})
export class DeleteOffreComponent {
  constructor(public dialogRef: MatDialogRef<DeleteOffreComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
