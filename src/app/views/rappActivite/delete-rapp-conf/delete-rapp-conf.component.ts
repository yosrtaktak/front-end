import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ButtonModule } from '@coreui/angular';

@Component({
  selector: 'app-delete-rapp-conf',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions,ButtonModule,MatDialogTitle],
  templateUrl: './delete-rapp-conf.component.html',
  styleUrl: './delete-rapp-conf.component.scss'
})
export class DeleteRappConfComponent {
  constructor(public dialogRef: MatDialogRef<DeleteRappConfComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  console.log("daata",this.data)
  }
  onCancel() {
    this.dialogRef.close();
  }

}
