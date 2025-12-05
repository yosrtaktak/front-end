import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-delete-lot-tache',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions,ButtonDirective,MatDialogTitle],
  templateUrl: './delete-lot-tache.component.html',
  styleUrl: './delete-lot-tache.component.scss'
})
export class DeleteLotTacheComponent {
  constructor(public dialogRef: MatDialogRef<DeleteLotTacheComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  console.log("daataaaaaaaaa======>>>",this.data)
  }
  onCancel() {
    this.dialogRef.close();
  }
}
