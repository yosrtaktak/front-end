import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { ButtonModule, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalToggleDirective } from '@coreui/angular';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatDateFormats } from '@angular/material/core';
import { ValidationService } from 'src/app/service/validation.service';
import { ValidationComponent } from '../forms/validation/validation.component';
@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [CommonModule,ModalComponent,MatSelectModule,MatOptionModule, MatDialogModule, MatFormField, MatInput, MatLabel, 
    ModalHeaderComponent,MatDialogActions, ModalToggleDirective,FormLabelDirective, ModalDialogComponent,FormFloatingDirective,FormFeedbackComponent, ModalBodyComponent,ButtonModule, MatDialogModule,FormsModule,ReactiveFormsModule],
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.scss'
})
export class ProjectDialogComponent implements OnInit{
  projectFormgroup: FormGroup = new FormGroup({});
  
  constructor(private FormBuilder:FormBuilder,private ValidationService : ValidationService,public dialogRef: MatDialogRef<ProjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  /*ngOnInit(): void {
    this.projectFormgroup = new FormGroup({
      //id : new FormControl('',[Validators.required]),
      code: new FormControl('', [Validators.required]),
      libelle: new FormControl('', [Validators.required]),
      creationDate: new FormControl('', [Validators.required]),

    })
    console.log("projectFormgroup", this.projectFormgroup)
  }*/
  ngOnInit(): void {
    this.initForm();
 
    if(this.data.value == 'Modifier'){
      this.projectFormgroup.patchValue({
        id:this.data.id,
        code:this.data.code,
        libelle:this.data.libelle,
        creationDate:this.data.creationDate
      })
    
    }
  } 
  initForm() {
    this.projectFormgroup = new FormGroup({
      id : new FormControl(''),
      code: new FormControl('', [Validators.required,Validators.minLength(4)]),
      libelle: new FormControl('', [Validators.required,Validators.minLength(4)]),
      creationDate: new FormControl(''),
    })}

    onSubmit() {
      if (this.projectFormgroup.valid) {
      
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
