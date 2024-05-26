
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule, ModalBodyComponent, ModalComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalToggleDirective } from '@coreui/angular';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE,MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDateFormats } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-project-dialog-ed',
  standalone: true,
  providers: [provideNativeDateAdapter(),DatePipe,{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  imports: [MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,MatDatepickerModule,ModalComponent,MatSelectModule,MatOptionModule, MatDialogModule, MatFormField, MatInput, MatLabel, 
    ModalHeaderComponent,MatDialogActions, ModalToggleDirective, ModalDialogComponent, 
    ModalFooterComponent,MatFormFieldModule, ModalBodyComponent,ButtonModule, MatDialogModule,FormsModule,ReactiveFormsModule],
  templateUrl: './project-dialog-ed.component.html',
  styleUrl: './project-dialog-ed.component.scss'
})

                      

export class ProjectDialogEdComponent {
  constructor(private datePipe: DatePipe,public dialogRef: MatDialogRef<ProjectDialogEdComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {  }
  projecteFormgroup: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.initForm();
 
    if(this.data.value == 'Modifier'){
      this.projecteFormgroup.patchValue({
        id:this.data.id,
        code:this.data.code,
        libelle:this.data.libelle,
        creationDate:this.data.creationDate
      })
      console.log("projectttt",this.projecteFormgroup)
    }
  } 
  initForm() {
    this.projecteFormgroup = new FormGroup({
      id : new FormControl('',[Validators.required]),
      code: new FormControl('', [Validators.required]),
      libelle: new FormControl('', [Validators.required]),
      creationDate: new FormControl('', [Validators.required]),
    })}
    // date = new FormControl(moment());

    // flightSchedule = {
    //   date: new Date()
    // }

  onCancel() {
    this.dialogRef.close();
  }
}

