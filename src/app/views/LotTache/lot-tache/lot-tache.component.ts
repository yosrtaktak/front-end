import { FormControlsComponent } from './../../forms/form-controls/form-controls.component';
import { CollapsesComponent } from './../../base/collapses/collapses.component';
import { AddLotComponent } from './../../addLot/add-lot/add-lot.component';
import { DeleteLotTacheComponent } from './../../deleteLoTache/delete-lot-tache/delete-lot-tache.component';
import { AddTacheComponent } from './../../addTache/add-tache/add-tache.component';
import { Tache } from './../../../models/tache';

import { forEach } from 'lodash-es';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCell, MatHeaderCell, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Lot } from 'src/app/models/Lot';

import { LotService } from 'src/app/service/lot/lot.service';
import { TacheService } from 'src/app/service/tache/tache.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonCloseDirective, ButtonDirective, ButtonModule, CollapseDirective, CollapseModule, ContainerComponent, ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalModule, ModalTitleDirective, ModalToggleDirective, NavItemComponent, NavLinkDirective, NavModule, NavbarModule, NavbarNavComponent, NavbarTogglerDirective, PopoverComponent, PopoverModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { navItems } from 'src/app/containers/default-layout/_nav';
import { MatTabContent } from '@angular/material/tabs';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { IconModule } from '@coreui/icons-angular';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CoreUIFormsModule } from '../../forms/forms.module';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lot-tache',
  standalone: true,
  imports: [CommonModule,
    RouterModule,MatFormFieldModule,MatOption,MatInput,CommonModule,MatSelect,MatDialogModule,ReactiveFormsModule,ButtonModule,
    NavbarModule,
    CollapseModule,
    NavbarTogglerDirective,
   ContainerComponent,
    CoreUIFormsModule,
    MatHeaderCell,MatCard,MatCardHeader,MatIcon,NavLinkDirective,
    MatDialogActions,ButtonDirective,MatTabContent,NavbarNavComponent,CollapseDirective,
    PopoverComponent,PopoverModule,MatDialogContent,NavModule, MatSortModule,
    ProgressModule, ReactiveFormsModule,NavLinkDirective,CollapseDirective,
    TableModule, ButtonCloseDirective, ModalContentComponent, ModalBodyComponent,
    TabsModule, ModalTitleDirective, ModalToggleDirective, ModalModule,
    TabsModule, ModalDialogComponent, MatDialogModule, ModalComponent,
    ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent,
    MatPaginatorModule, MatTableModule, MatIconModule , IconModule,MatIcon,MatToolbarModule,NavbarModule,MatCardTitle,MatCardSubtitle,MatCardContent,
    ContainerComponent,NavItemComponent,CollapseModule,MatCell],
  templateUrl: './lot-tache.component.html',
  styleUrl: './lot-tache.component.scss'
})
export class LotTacheComponent implements OnInit {
  lots:Lot[];
  taches:Tache[];
  LotId:number;
  lotTachesMap: Map<number, any[]> = new Map();
  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  dropdownState = false;
  constructor(private snackBar:MatSnackBar,private dialog: MatDialog,private tacheService:TacheService,private lotService:LotService,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<LotTacheComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
     this.getLotByProjetId(this.data.id);
     
  }


  async getLotByProjetId(projetId: number): Promise<any> {
    try {
       this.lots = await this.lotService.getLotByIdProjet(projetId).toPromise();
       this.lots.forEach((el:any)=>{
        this.LotId=el.id;
        console.log(" this.LotId", this.LotId)
        this.getTacheByLotId(this.LotId);
       })
       this.dataSource.data = this.lots;
      
      return this.lots.map((lot: any) => ({ id: lot.id, code: lot.code,libelle:lot.libelle }));
    
    } catch (error) {
      console.error('Error fetching lots:', error);
      throw error; // Rethrow the error to handle it in the caller function
    }
  
  }

  getTacheByLotId(lotId:number){
    this.tacheService.getTacheByLotId(lotId).subscribe(
      (taches:any)=>{
        this.lotTachesMap.set(lotId, taches); 
        console.log(" this.taches", this.taches)
      },
      (error) => {
        console.error('Erreur lors de la récupération des lots :', error);
      }
    )
    this.dataSource.data = this.taches;
  }

  addLot() {   
     const dialogRef = this.dialog.open(AddLotComponent, {
    width: '20%',
    data: { projet:this.data.id ,value: 'Ajouter' }
  });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        const body = {
          code:result.value.code,
          libelle:result.value.libelle,
          projet: this.data.id,
        }
          if (result) {
            console.log("Type Value:", result.value.type);
          }
        
          this.lotService.addLot(body).subscribe({
            next: data1 => {
              this.getLotByProjetId(this.data.id);
              this.openSuccessSnackBar('Lot ajouté avec succès.');
            },
            error: error => {
              if (error.status === 500) { 
                this.openErrorSnackBar('Le code du lot existe déjà.');
              }
            }
          });
        }
  })}
  addTache(lotId : any){
    const dialogRef = this.dialog.open(AddTacheComponent, {
      width: '20%',
      data: { lot:lotId ,value: 'Ajouter' }
    });
    console.log("lot========>",lotId)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body = {
          code:result.value.code,
          libelle:result.value.libelle,
          lot:lotId
  }
  this.tacheService.addTache(body).subscribe({
    next: data1 => {
      this.getTacheByLotId(lotId);
      this.openSuccessSnackBar('Tâche ajoutée avec succès.');
    },
    error: error => {
      if (error.status === 500) { 
        this.openErrorSnackBar('Le code du tâche existe déjà.');
      }
    }
  });
}
})}
editLot(element: any) {
  const dialogRef = this.dialog.open(AddLotComponent,
    {
      width: '20%',
      data: {id:element.id,code:element.code,libelle:element.libelle, projet: this.data.id,value:'Modifier'}
    });
  dialogRef.afterClosed().subscribe(result => {
    console.log("results",result)
    console.log("this.data.id",this.data.id)
    if (result) {
      const body = {
        id:result.value.id,
        code:result.value.code,
        libelle:result.value.libelle,
        projet: this.data.id,
      }
      this.lotService.editLot(body).subscribe({
        next: data => {
           this.getLotByProjetId(this.data.id);
           this.openSuccessSnackBar('Lot a été modifié avec succès.');
        },
        error: error => {
          if (error.status === 500) { 
            this.openErrorSnackBar('Cet lot existe déjà.');
          }
        }
      });
    }
  });
}
editTache(element:any){
  const dialogRef = this.dialog.open(AddTacheComponent,
    {
      width: '20%',
      data: {id:element.id,code:element.code,libelle:element.libelle,lot:this.LotId,value:'Modifier'}
    });
  dialogRef.afterClosed().subscribe(result => {
  
    if (result) {
      const body = {
        id:result.value.id,
        code:result.value.code,
        libelle:result.value.libelle,
        lot:this.LotId
      }
    
      this.tacheService.editTache(body).subscribe({
        next: data => {
           this.getTacheByLotId(this.LotId);
           this.openSuccessSnackBar('Tâche a été modifiée avec succès.');
        },
        error: error => {
          if (error.status === 500) { 
            this.openErrorSnackBar('Cette tâche existe déjà.');
          }
        }
      });
    }
  }); 
}
onDeleteTache(element : any){
  const dialogRef = this.dialog.open(DeleteLotTacheComponent, {
    width: '250px',
    data: {message: 'Êtes-vous sûr de supprimer cette tache',code:element.code,value: 'Supprimer tache' , value1:'Supprimer' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    this.tacheService.onDelete(element).subscribe({
      next: data => {
        this.ngOnInit();
        this.openSuccessSnackBar('Tâche a été supprimée avec succès.');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    }); 
    }})
    }
onDeleteLot(element : any) {
  const dialogRef = this.dialog.open(DeleteLotTacheComponent, {
    width: '250px',
    data: {message: 'Êtes-vous sûr de supprimer ce lot ',value: 'Supprimer lot',value1:'Supprimer' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
  this.lotService.onDelete(element).subscribe({
    next: data => {
      this.ngOnInit();
      this.openSuccessSnackBar('Lot a été supprimé avec succès.');
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });
}})}
  onCancel() {
    this.dialogRef.close();
  }

  toggleDropdown(event: MouseEvent) {
    this.dropdownState = !this.dropdownState;
    event.stopPropagation();
  }
  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // Duration in milliseconds
      
    });
  }
  
  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // Duration in milliseconds
      
    });
}
}
