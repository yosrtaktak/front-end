import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalDialogComponent, ModalHeaderComponent, ModalToggleDirective } from '@coreui/angular';
import { ValidationService } from 'src/app/service/validation.service';

@Component({
  selector: 'app-add-offre',
  standalone: true,
  imports: [CommonModule,ModalComponent,MatSelectModule,MatOptionModule, MatDialogModule, MatFormField, MatInput, MatLabel, 
    ModalHeaderComponent,MatDialogActions, ModalToggleDirective,FormLabelDirective, ModalDialogComponent,FormFloatingDirective,FormFeedbackComponent, ModalBodyComponent,ButtonModule, MatDialogModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-offre.component.html',
  styleUrl: './add-offre.component.scss'
})
export class AddOffreComponent {
  offreFormgroup: FormGroup = new FormGroup({});
  
  constructor(private FormBuilder:FormBuilder,private ValidationService : ValidationService,public dialogRef: MatDialogRef<AddOffreComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.initForm();
 
    if(this.data.value == 'Modifier'){
      this.offreFormgroup.patchValue({
        id:this.data.id,
        code:this.data.code,
        libelle:this.data.libelle,
        creationDate:this.data.creationDate
      })
      console.log("this.data",this.data)
    }
  } 
  initForm() {
    this.offreFormgroup = new FormGroup({
      id : new FormControl(''),
      code: new FormControl('', [Validators.required,Validators.minLength(4)]),
      libelle: new FormControl('', [Validators.required,Validators.minLength(4)]),
      creationDate: new FormControl(''),
    })}

    onSubmit() {
      if (this.offreFormgroup.valid) {
        // Effectuer des actions lorsque le formulaire est valide
        console.log('Formulaire soumis avec succès !');
      } else {
        // Afficher un message d'erreur ou effectuer d'autres actions pour indiquer que le formulaire est invalide
        console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
      }
    }
  onCancel() {
    this.dialogRef.close();
  }
}
