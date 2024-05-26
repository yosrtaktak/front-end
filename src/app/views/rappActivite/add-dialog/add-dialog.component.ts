import { LoginService } from 'src/app/service/login.service';
import { User } from './../../../models/users';
import { UsersService } from './../../../service/users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher, MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ButtonModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
// &
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { ValidationComponent } from '../../forms/validation/validation.component';

import { MatTableDataSource } from '@angular/material/table';
export interface MonthYear {
  value: number;
  viewValue: string;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [MatFormFieldModule,MatOption,MatInput,CommonModule,MatSelect,MatDialogModule,ReactiveFormsModule,ButtonModule],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent implements OnInit {
  constructor(public loginService:LoginService,private UsersService:UsersService,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  etatList=['EN_COURS','EN_ATTENTE','CLOTURE'];
  editFormgroup: FormGroup = new FormGroup({});
  dataSource = new MatTableDataSource<User>();
  etatToUpdate : any[];
  etatRap :any;
  users: User[];
  // yearList: MonthYear[] = Array(50).fill(1).map( (_, index) => { return { value: String(index + 2010), viewValue: String(index + 2010) } })
  yearList: MonthYear[] = Array(50).fill(1).map((_, index) => {
    const currentYear = new Date().getFullYear();
    return {
      value: currentYear - index, // Commencer par l'année actuelle et aller en arrière
      viewValue: String(currentYear - index) // Convertir en chaîne de caractères
    };
  })
  monthList: MonthYear[] = [
    { value: 1, viewValue: 'Jan' },
    { value: 2, viewValue: 'Feb' },
    { value: 3, viewValue: 'Mar' },
    { value: 4, viewValue: 'Apr' },
    { value: 5, viewValue: 'May' },
    { value: 6, viewValue: 'Jun' },
    { value: 7, viewValue: 'Jul' },
    { value: 8, viewValue: 'Aug' },
    { value: 9, viewValue: 'Sep' },
    { value: 10, viewValue: 'Oct' },
    { value: 11, viewValue: 'Nov' },
    { value: 12, viewValue: 'Dec' },
  ];

  
  ngOnInit(): void {
  console.log("this.loginService.userName=====>",this.loginService.userName)
      this.getAllUsers();
      this.initForm();
     
      this.editFormgroup.patchValue({
        id:this.data.id,
        code:this.data.code,
        year:this.data.year,
        month:this.data.month,
        comment:this.data.comment,
        etat:"EN_COURS",
        user:this.loginService.userName    
       })
    
    
  
      console.log("ettttaaat",this.editFormgroup)
    }
    initForm(){
      this.editFormgroup = new FormGroup({
        id: new FormControl(''),
        code: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
        month: new FormControl('', [Validators.required]),
        comment:new FormControl(''),
        etat : new FormControl([],[Validators.required]),
        user:new FormControl(''),
      })
    }
    matcher = new MyErrorStateMatcher();
  change(event: any) {
    console.log("event",event.value);
}

async getAllUsers(): Promise<any> {
  try {
  this.users = await this.UsersService.getAllUsers().toPromise();
  (users: User[]) => {
    this.users = users;
  this.dataSource = new MatTableDataSource<User>(users);
  }
  console.log("userrrrrrrrrr",this.dataSource);
  return  this.users;
} catch (error) {
  console.error('Une erreur est survenue lors de la récupération des projets :', error);
  throw error; // Rejette la promesse avec l'erreur
}
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

