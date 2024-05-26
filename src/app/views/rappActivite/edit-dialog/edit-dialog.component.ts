import { etat } from './../../../models/etat';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ButtonGroupsComponent } from '../../buttons/button-groups/button-groups.component';
import { ButtonDirective, ButtonModule } from '@coreui/angular';
import { MatInput } from '@angular/material/input';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [MatOption,MatInput,MatFormFieldModule,ReactiveFormsModule,MatFormField,ButtonDirective,ButtonModule,CommonModule,MatLabel,MatSelect,ReactiveFormsModule,MatDialogModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  constructor(public loginService:LoginService,public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  etatList=['EN_COURS','EN_ATTENTE','CLOTURE'];
  validerLIste=['EN_ATTENTE']
  editFormgroup: FormGroup = new FormGroup({});
  etatToUpdate : any[];
  etatRap :any;
  ngOnInit(): void {
    this.initForm();
   
    if(this.data.value == 'Modifier'){
      this.editFormgroup.patchValue({
       id:this.data.id,
       code:this.data.code,
       year:this.data.year,
       month:this.data.month,
       comment:this.data.comment,
       etat:this.data.etat,
       user:this.data.user.username
      })
   
      }
      if(this.data.value == 'Valider'){
        this.editFormgroup.patchValue({
         id:this.data.id,
         code:this.data.code,
         year:this.data.year,
         month:this.data.month,
         comment:this.data.comment,
         etat:"EN_ATTENTE",
         user:this.data.user.username
        })
        console.log("heyyyyyyy",this.data.month)
    }
  }
    initForm(){
      this.editFormgroup = new FormGroup({
        id: new FormControl('',[Validators.required]),
        code:new FormControl('',[Validators.required]),
        year:new FormControl('',[Validators.required]),
        month:new FormControl('',[Validators.required]),
        comment: new FormControl('',[Validators.required]),
        etat: new FormControl('',[Validators.required]),
        user: new FormControl('')
      })
    }
  change(event: any) { 
    console.log("event",event.value);
}
onCancel() {
  this.dialogRef.close();
}
}
