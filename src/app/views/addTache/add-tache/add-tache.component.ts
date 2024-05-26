import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ButtonDirective, ButtonModule } from '@coreui/angular';
import { TacheService } from 'src/app/service/tache/tache.service';

@Component({
  selector: 'app-add-tache',
  standalone: true,
  imports: [MatFormFieldModule,MatOption,MatInput,CommonModule,MatSelect,MatDialogModule,ReactiveFormsModule,ButtonModule,MatFormField,CommonModule,ReactiveFormsModule,MatLabel,MatError,MatDialogContent,MatDialogClose,ButtonDirective,MatInput],
  templateUrl: './add-tache.component.html',
  styleUrl: './add-tache.component.scss'
})
export class AddTacheComponent {
  editFormgroup: FormGroup = new FormGroup({});
  constructor(private tacheService:TacheService,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddTacheComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  this.initForm();
 
  this.editFormgroup.patchValue({
    code:this.data.code,
    libelle:this.data.libelle,
    lot:this.data.Lot
  })
  if(this.data.value == 'Modifier'){
    this.editFormgroup.patchValue({
      id:this.data.id,
      code:this.data.code,
      libelle:this.data.libelle,
      lot:this.data.LotId
    })
  }
} 
 
  initForm() {
    this.editFormgroup = new FormGroup({
      id: new FormControl(''),
      code: new FormControl('', Validators.required),
      libelle: new FormControl('', Validators.required),
      lot: new FormControl(''),
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

