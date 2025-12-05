import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ButtonDirective, ButtonModule } from '@coreui/angular';
import { LotService } from 'src/app/service/lot/lot.service';
import { TacheService } from 'src/app/service/tache/tache.service';

@Component({
  selector: 'app-add-lot-tache',
  standalone: true,
  imports: [MatFormFieldModule,MatOption,MatInput,CommonModule,MatSelect,MatDialogModule,ReactiveFormsModule,ButtonModule,MatFormField,CommonModule,ReactiveFormsModule,MatLabel,MatError,MatDialogContent,MatDialogClose,ButtonDirective,MatInput],
  templateUrl: './add-lot.component.html',
  styleUrl: './add-lot.component.scss'
})
export class AddLotComponent {

  editFormgroup: FormGroup = new FormGroup({});
  constructor(private tacheService:TacheService,private lotService:LotService,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddLotComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    debugger
  this.initForm();

  if(this.data.value == 'Modifier'){
    this.editFormgroup.patchValue({
      id:this.data.id,
      code:this.data.code,
      libelle:this.data.libelle,
      projet:this.data.id
    })
    console.log("this.editFormgroup",this.editFormgroup)
  }
} 
 
  initForm() {
    this.editFormgroup = new FormGroup({
      id:new FormControl(''),
      code: new FormControl('', Validators.required),
      libelle: new FormControl('', Validators.required),
      projet:new FormControl(''),
})
}
onSubmit() {
  if (this.editFormgroup.valid) {
    // Effectuer des actions lorsque le formulaire est valide
    console.log('Formulaire soumis avec succès !');
  } else {
    // Afficher un message d'erreur ou effectuer d'autres actions pour indiquer que le formulaire est invalide
    console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
  }}
  onCancel() {
    this.dialogRef.close();
  }
}
