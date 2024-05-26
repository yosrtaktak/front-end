import { MatDialogModule } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AvatarModule, ButtonDirective, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, ModalComponent, ModalContentComponent, ModalHeaderComponent, ModalToggleDirective, NavModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { ModalDialogComponent, ModalFooterComponent, ModalBodyComponent } from '@coreui/angular';

import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { Role } from 'src/app/models/role';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../widgets/widgets.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@coreui/icons-angular';
import { UserComponent } from '../user/user/user.component';
@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [ModalHeaderComponent,ModalDialogComponent,ModalComponent,MatSelectModule,MatOptionModule, MatDialogModule, MatFormField, MatInput, MatLabel, 
    ModalHeaderComponent, UserComponent, ModalToggleDirective, ModalDialogComponent, 
    ModalFooterComponent, ModalBodyComponent,ButtonModule, FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  rolesList: string[] = ['user','moderator','admin'];
  rolesUser: string[] =[];
  selectedRoles: string | null = null;
  userFormgroup: FormGroup = new FormGroup({});
  roleToUpdate:any[]
  
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.initForm();
    console.log(this.data.role)
   
    if(this.data.value == 'Modifier'){
      this.roleToUpdate = this.data.role;
      this.data.role.map((role: any) => { 
        this.rolesUser.push(role.name)
      })
      this.userFormgroup.patchValue({
        id:this.data.id,
        username:this.data.username,
        email:this.data.email,
        role:this.rolesUser
      })
      }
      console.log(this.userFormgroup)
      // this.rolesUser.forEach((role: string, index: any) => {
      //   this.userFormgroup.get(`role.${index}`)?.patchValue(this.rolesUser);
  }
  /*onRoleSelectionChange(event: any) {
    const selectedRoles = event.value;
    this.userFormgroup.patchValue({
      roles: selectedRoles
    });}*/
  initForm() {
    this.userFormgroup = new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role : new FormControl([],[Validators.required])
    })
  }
  change(event: any) {
    console.log("event",event.value);

  //   if(event.isUserInput) {
  //   const selectedRoles = event.value;
  //   this.userFormgroup.patchValue({
  //     role: selectedRoles
  //   });
  //   console.log("event",event.value); 
  // }
}
onSubmit() {
  if (this.userFormgroup.valid) {
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

