import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ButtonModule } from '@coreui/angular';

@Component({
  selector: 'app-delete-act',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions,ButtonModule,MatDialogTitle],
  templateUrl: './delete-act.component.html',
  styleUrl: './delete-act.component.scss'
})
export class DeleteActComponent {
  constructor(public dialogRef: MatDialogRef<DeleteActComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  console.log("daata",this.data)
  }
  onCancel() {
    this.dialogRef.close();
  }
}
