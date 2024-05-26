import { rapport } from './../../../../models/rapport';
import { historique } from './../../../../models/historique';
import { LoginService } from './../../../../service/login.service';
import { HistoriqueService } from './../../../../service/historique/historique.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from '../../add-dialog/add-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardRoutingModule } from 'src/app/views/dashboard/dashboard-routing.module';
import { ButtonDirective, ButtonGroupModule, ButtonModule, CollapseDirective, ContainerComponent, FormModule, GridModule, ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalToggleDirective, NavItemComponent, NavModule, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective, PopoverComponent, PopoverDirective } from '@coreui/angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectDialogComponent } from 'src/app/views/project-dialog/project-dialog.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WidgetsModule } from 'src/app/views/widgets/widgets.module';
import { IconModule } from '@coreui/icons-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [DashboardRoutingModule,
    ModalToggleDirective,ModalContentComponent,MatToolbarModule,
    MatDialogModule,
   CommonModule,MatTableModule,
    PopoverComponent,MatDialogActions,
   ReactiveFormsModule,
   PopoverDirective,
  NavbarComponent,NavItemComponent,NavbarTogglerDirective,ContainerComponent,
  NavbarNavComponent,CollapseDirective,ButtonDirective, ButtonGroupModule, ButtonModule,
  FormModule, GridModule, NavModule,
   WidgetsModule,
  ModalDialogComponent,
   ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent,
   MatPaginatorModule,MatTableModule,MatIconModule,IconModule],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss'
})
export class HistoriqueComponent implements OnInit{
  displayedColumns = ['Date creation','Etat','Commentaire','Utilisateur'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource =new MatTableDataSource<historique>();
  editFormgroup: FormGroup = new FormGroup({});
constructor(private _snackBar: MatSnackBar,private historiqueService:HistoriqueService,public loginService:LoginService,public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}
ngOnInit(): void {

  this.getHistoriqueByRapportId(this.data.rapportId);

}
getHistoriqueByRapportId(rapportId:number){
  this.historiqueService.getHistoriqueByRapportId(rapportId).subscribe({
    next : data =>{
      this.dataSource = new MatTableDataSource<historique>(data);
      this.dataSource.paginator = this.paginator;
      
    }
    
  })
}
openErrorSnackBar(message: string) {
  this._snackBar.open(message, 'Fermer', {
    duration: 3000, // Duration in milliseconds
   
  });
}
// onAdd(){
// const body = {
//   etat:this.data.newEtat,
//   comment: this.data.commentaire,
//   rapport:this.data.rapportId,
//   user: this.data.userModRap,
// };

// // Appeler la fonction de création du rapport
// this.historiqueService.addHistorique(body).subscribe({
//   next: data => {
//     this.getHistoriqueByRapportId(this.data.rapportId);
//   },
//   error: error => {
//     console.log("Une erreur s'est produite lors de la création du rapport :", error);
//   }
// });}
// initForm(){
//   this.editFormgroup = new FormGroup({
//     id: new FormControl('',[Validators.required]),
//     DateCreation:new FormControl('',[Validators.required]),
//     etat:new FormControl('',[Validators.required]),
//     rapport:new FormControl('',[Validators.required]),
//     comment: new FormControl('',[Validators.required]),
//     user: new FormControl('')
//   })
// }
onCancel() {
  this.dialogRef.close();
}
getStatusLabel(etat: string): string {
  switch (etat) {
    case 'EN_COURS':
      return 'En cours';
    case 'EN_ATTENTE':
      return 'En attente de validation';
    case 'CLOTURE':
      return 'Clôture';
    default:
      return etat;
  }
}
}



