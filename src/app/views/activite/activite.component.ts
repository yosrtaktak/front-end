import { DeleteActComponent } from './../DeleteActivite/delete-act/delete-act.component';
import { project } from './../../models/projects';

import { Tache } from './../../models/tache';
import { etat } from './../../models/etat';
import { offre } from './../../models/offre';

import { imputation } from './../../models/imputation';
import { ImputationService } from './../../service/imputation/imputation.service';
import { rapport } from './../../models/rapport';
import { ActiviteService } from './../../service/activite/activite.service';
import { activite } from './../../models/activite';
import { Router } from '@angular/router';
import { ModalsComponent } from './../notifications/modals/modals.component';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCell, MatCellDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RapportActiviteComponent } from '../rappActivite/rapport-activite/rapport-activite.component';
import { CollapseDirective, ContainerComponent, NavItemComponent, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective, ButtonDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalComponent, TabsModule, ModalDialogComponent, TableModule, ProgressModule, NavModule, GridModule, FormModule, CardModule, ButtonModule, ButtonGroupModule, AvatarModule, NavLinkDirective, NavbarModule, HeaderBrandComponent, HeaderNavComponent, ModalToggleDirective, PaginationComponent, PaginationModule, ModalContentComponent, PopoverComponent, PopoverModule, HeaderComponent, BorderDirective, ModalTitleDirective, ButtonCloseDirective, ModalModule, ButtonToolbarComponent } from '@coreui/angular';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IconModule } from '@coreui/icons-angular';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { WidgetsModule } from '../widgets/widgets.module';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ButtonGroupsComponent } from '../buttons/button-groups/button-groups.component';
import { ButtonsComponent } from '../buttons/buttons/buttons.component';
import { MatButtonModule } from '@angular/material/button';
import { AddActDialogComponent } from '../addActDialog/add-act-dialog/add-act-dialog.component';
import { FormsModule } from '@angular/forms';
import { RapportService } from 'src/app/service/rapport/rapport.service';

import { DatePipe } from '@angular/common';
import { forEach } from 'lodash-es';
import { Observable, firstValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Lot } from 'src/app/models/Lot';
import { LotService } from 'src/app/service/lot/lot.service';
import { LoginService } from 'src/app/service/login.service';
import { Type } from '@angular/compiler';
@Component({
  selector: 'app-activite',
  standalone: true,
  imports: [DashboardRoutingModule, PaginationComponent, PaginationModule,
    CardModule, ModalToggleDirective, ModalContentComponent, MatIcon, PopoverComponent, PopoverModule,
    NavModule, UserDialogComponent, MatFormField, MatLabel, MatDialogModule, MatDialogContent,
    TabsModule, MatDialogModule, MatTooltipModule,
    CommonModule, ButtonDirective, MatSort,
    GridModule, CommonModule, HeaderBrandComponent, HeaderNavComponent, HeaderComponent,
    ProgressModule, MatIconModule, MatCellDef,
    ReactiveFormsModule, MatCell, FormsModule,
    ButtonModule, BorderDirective,
    FormModule,
    ButtonGroupModule, MatTableModule,
    ChartjsModule, NavbarModule, CollapseDirective, NavLinkDirective,
    AvatarModule, MatDialogModule,
    TableModule, MatToolbarModule,
    WidgetsModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule, ButtonDirective, MatButtonModule,
    GridModule, ButtonToolbarComponent,
    NavModule, MatSortModule,
    ProgressModule, ReactiveFormsModule,
    TableModule, ButtonCloseDirective, ModalContentComponent, ModalBodyComponent,
    TabsModule, ModalTitleDirective, ModalToggleDirective, ModalModule,
    TabsModule, ModalDialogComponent, MatDialogModule, ModalComponent, ModalDialogComponent,
    ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent,
    MatPaginatorModule, MatTableModule, MatIconModule, IconModule],
  templateUrl: './activite.component.html',
  styleUrl: './activite.component.scss'
})
export class ActiviteComponent implements OnInit {
  Formgroup: FormGroup = new FormGroup({});
  displayedColumns: any[];

  constructor(private snackBar:MatSnackBar,public loginService:LoginService,private lotService: LotService, private _snackBar: MatSnackBar, private fb: FormBuilder, private ImputationService: ImputationService, private rapportService: RapportService, public dialogRef: MatDialogRef<ActiviteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private ActiviteService: ActiviteService) {
    this.displayedColumns = ['activité', this.generateDays(1, data.month), 'total'];
  }
  liste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<activite>();
  dataSource1 = new MatTableDataSource<imputation>();
  data1: activite[] = [];
  data2: imputation[] = [];
  lots: Lot[];
  activitesIds: number[] = [];
  Heure: number[] = [];
  dateCreation: string[] = [];
  numbers: number[] = [0, 0.25, 0.5, 0.75, 1];
  total: number;
  totalByDate: any = {};
  totalDate: number[] = [];
  id: number;
  generatedDays: any[] = [];
  selectedValue: number;
  editFormgroup: FormGroup = new FormGroup({});
  shouldCallFunction: boolean = true;
  imputationPromises: any;
  projetLibelle: any;
  projetId: any;
  offreName: any;
  isAdmin: boolean = false;
  disable:boolean = false;
  tacheCode:any;
  taches:Tache[]=[];
  tacheLibelle:any;
  offreLibelle:any;
  tacheLibelleMap: { [activiteId: number]: string } = {};
  offreLibelleMap: { [activiteId: number]: string } = {};
  ngOnInit() {
    this.getActiviteByIdRapport(this.data.id)
    this.generatedDays = this.generateDays(1, this.data.month);
    this.getTotalHoursByDate();
    if (this.loginService.userId !== this.data.idUser) {
      this.isAdmin = true;
      this.disable=true;
    }
    if(this.data.etat == "EN_ATTENTE" || this.data.etat == "CLOTURE" ){
      this.disable=true;
    }
  }
  initForm() {
    this.editFormgroup = new FormGroup({
      id: new FormControl(''),
      creationDate: new FormControl(''),
      nbHeure: new FormControl(''),
      activite: new FormControl('')
    })

  }

  getTotalHours() {
    this.ImputationService.getTotalHours().subscribe(data => {
      this.total = data;
    })
  }
  async getTotalHoursByDate() { 
    let dates: any[] = []
    let daysOfMonth = this.generateDays(1, this.data.month);
    
    daysOfMonth.forEach(element => {
      let inputDate = new Date(this.data.year, this.data.month - 1, element)
      let formattedDate = inputDate.toISOString().slice(0, 19).replace("T", " ");

      formattedDate = formattedDate.substring(0, 10)
      let formatDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;

    
      dates.push(formatDate);
    });
   
    await this.ImputationService.getTotalHoursByDate(dates, this.data.id, this.data.idUser).subscribe(data => {
   
      this.totalByDate = data;
    });
 
  }
  async getActiviteByIdRapport(rapportId: number): Promise<any> {
    try {
      const data1 = await this.ActiviteService.getActiviteByIdRapport(rapportId).toPromise();
     
     
      if (data1.length !== 0) {
        data1.forEach((activite: any) => {
          if (activite.type === 'projet' && activite.tache) {
            this.tacheLibelle = activite.tache.libelle
            this.tacheLibelleMap[activite.id] = activite.tache.libelle;
          
          } else if (activite.type === 'offre' && activite.offre) {
            this.offreLibelle = activite.offre.libelle
            this.offreLibelleMap[activite.id] = activite.offre.libelle;
          } else {
            console.log('Type non reconnu:', activite.type);
          }
        });
        for (const activite of data1) {
          this.projetLibelle = activite.projet;
          this.offreName = activite.offre;
          let tacheId = activite.tache;
          await this.generateDateImputation(activite);

        }
      }

      this.dataSource = new MatTableDataSource<activite>(data1);
      this.dataSource.paginator = this.paginator;

      return data1;
    } catch (error) {

      console.error("Error in getActiviteByIdRapport:", error);
      throw error;
    }
  }
  getTacheLibelle(tacheId: number): string {
    const tache = this.taches.find(t => t.id === tacheId);
    return tache ? tache.libelle.toString() : '';
}
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  getCellValue(outerElement: any): string {
    // this.getLotByProjetId( outerElement.projet.id)
    // if (outerElement.projet && outerElement.projet.id) {
    //   const projetId = outerElement.projet.id;
    //   const lotDuProjet = this.lots.find((lot: any) => lot.projet.id === projetId);
    //   return lotDuProjet ? lotDuProjet.name : "";
    // }
    if (outerElement.projet && outerElement.projet.libelle) {
      return outerElement.projet.libelle;
    } else if (outerElement.offre !== null && this.projetLibelle === null) {
      return outerElement.offre.name;
    }
    // else if (this.lots && outerElement.projet && outerElement.projet.id) {
    //   const projetId = outerElement.projet.id;
    //   const lotDuProjet = this.lots.find((lot: any) => lot.projet.id === projetId);
    //   return lotDuProjet ? lotDuProjet.name : "";
    // }
    else {
      return ""; // Ou une valeur par défaut si nécessaire
    }
  }
  getLotByProjetId(projetId: number) {
    this.lotService.getLotByIdProjet(projetId).subscribe(
      (lots: any) => {
        this.lots = lots;
      },
      (error) => {
        console.error('Erreur lors de la récupération des lots :', error);
      }
    );
  }
  getAllActivite() {
    this.ActiviteService.getAllActivite().subscribe({
      next: data1 => {
        this.dataSource = new MatTableDataSource<activite>(data1);
        this.dataSource.paginator = this.paginator;
      }

    })

  }
  async getImputationByIdActivite(activiteId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {

      try {
        const data2 = await this.ImputationService.getImputationById(activiteId).toPromise();

        if (data2.length !== 0) {
          data2.forEach((imputation: any) => {
            this.Heure.push(imputation.nbHeure);
          });
          this.initForm();
          this.dataSource1 = new MatTableDataSource<imputation>(data2);
          this.dataSource1.paginator = this.paginator;
    
          resolve(this.dataSource1.data);
        } else {
          
          resolve([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données d'imputation:", error);
        reject(error);
      }
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action);
    const config = new MatSnackBarConfig();
    config.duration = duration; // Définir la durée en millisecondes
    this._snackBar.open(message, 'Fermer', config);
  }

  ancienIdImputation: any;
  ancienneValeurNbHeure: any
  onOptionClick(ancienId: any, ancienneValeurNbHeure: any) {
    this.ancienIdImputation = ancienId;
    this.ancienneValeurNbHeure = ancienneValeurNbHeure;
  }
  ancienneValuer: number;
  async onSelectChange(activite: any, day: number) {
    this.ancienneValuer = this.ancienneValeurNbHeure;
    const selectedValue = this.imputationByActivite[activite.id][day - 1].nbHeure;

    let date = new Date();
    
    let currentMonth = this.data.month; // Month starts from 0, so add 1 to get the actual month
    let currentYear = this.data.year;

    let datee = new Date(currentYear, currentMonth - 1, day, 0, 0, 0);

    let formattedDate = `${datee.getFullYear()}-${(datee.getMonth() + 1).toString().padStart(2, '0')}-${datee.getDate().toString().padStart(2, '0')}`;

    if (this.ancienIdImputation) {
      await this.updateNbHeure(selectedValue, this.ancienIdImputation, formattedDate, activite);
     
    } else {
      this.addNbHeure(selectedValue, formattedDate, activite)
    
    }
   
  }
  addNbHeure(newValue: any, formattedDate: string, activite: any) {
 
    const updatedData = {
      nbHeure: newValue,
      creationDate: formattedDate,
      activite: activite,
    };

    this.ImputationService.addImputation(updatedData).subscribe((response: any) => {
        this.openSnackBar("Imputation ajouté avec succés", newValue, 2000)
        const numericValue = parseFloat(newValue);
        activite.total += numericValue;
        this.getTotalHoursByDate();
        this.ngOnInit();
      });
      
  }
  
  somme: number;
  updateNbHeure(newValue: any, imputationId: any, formattedDate: string, activite: any) {

    const updatedData = {
      id: imputationId,
      nbHeure: newValue,
      creationDate: formattedDate,
      activite: activite,

    };

    this.ImputationService.editImputation(updatedData)

      .subscribe((response: any) => {
        this.openSnackBar("Imputation modifié avec succés", newValue, 2000)
        const numericValue = parseFloat(newValue);
       
        
        if (typeof activite.total === 'number') {
          activite.total = (activite.total - this.ancienneValuer) + numericValue;
          this.getTotalHoursByDate();
        }
      });
     
  }

  generateDays(month: number, year: number): number[] {
    const daysInMonth = new Date(this.data.year, this.data.month, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }
  generateZero(data: any, month: any) {
    let num = this.generateDays(data.length + 1, month).length
    return num - data.length
  }
  
  nbreHeureImputeByDay: number[] = [];
  imputationByActivite: { [activiteId: string]: { id: number | null; nbHeure: number; }[] } = {};
  async generateDateImputation(activite: any) {
    const imputationPromises = await this.getImputationByIdActivite(activite.id);
    let imputation: any = imputationPromises;
    this.nbreHeureImputeByDay = [];


    try {

      const imputationPromises = await this.getImputationByIdActivite(activite.id);
      const imputation: any[] = imputationPromises || [];

      const imputationForCurrentActivite: { id: number | null, nbHeure: number }[] = [];

      this.generatedDays.forEach(element => {
        let nbreHeureImpute: number = 0;
        let imputationId: number | null = null;

        imputation.forEach((el: any) => {
          const datee = new Date(el.creationDate);
          const dayElement = datee.getDate();

          if (dayElement === element) {
            nbreHeureImpute = el.nbHeure;
            imputationId = el.id;
          }
        });

        imputationForCurrentActivite.push({ id: imputationId, nbHeure: nbreHeureImpute });
      });

      this.imputationByActivite[activite.id] = imputationForCurrentActivite;
     
    } catch (error) {
      console.error('Une erreur est survenue :', error);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
  addAct() {
    const dialogRef = this.dialog.open(AddActDialogComponent, {
      width: '30%', 
      data: { rapport: this.data.id, value: 'Ajouter',yearRapport:this.data.year }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        const body = {
          rapport: this.data.id,
          type: result.value.type ? result.value.type : null,
          projet: result.value.projet ? result.value.projet : null,
          offre: result.value.offre ? result.value.offre : null,
          lot: result.value.lot ? result.value.lot : null,
          tache: result.value.tache ? result.value.tache : null,
          comment: result.value.comment
        }

        this.ActiviteService.addActivite(body).subscribe({
          next: data1 => {
            this.getActiviteByIdRapport(this.data.id);
            this.openSuccessSnackBar('Activité ajouté avec succès.');
          },
          error: error => {
            console.log("there is error", error);
          }
        });
      }
    })
  }
  onDelete(element : any) {
    const dialogRef = this.dialog.open(DeleteActComponent, {
      width: '250px',
      data: {message: 'Êtes-vous sûr de supprimer cette activité',value: 'Supprimer' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.ActiviteService.onDelete(element.id).subscribe({
      next: data => {
        this.ngOnInit();
        this.openSuccessSnackBar('Activité supprimé avec succès.');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }})}
  containsAutoFormationOrMission(types: any): boolean {
    return types.includes('autoFormation') || types.includes('mission') || types.includes('conge');
  }
  containsProjetOffre(types: any) : boolean {
    return types.includes('projet') || types.includes('offre');
  }
  getTypeLabel(type: any): string {
    switch (type) {
      case 'projet':
        return 'Projet';
      case 'offre':
        return 'Offre';
      case 'autoFormation':
        return 'Auto Formation';
      case 'mission':
        return 'Mission';
      case 'conge':
        return 'Congé'
      default:
        return type;
    }
  }
  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, 
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }
  
  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, 
    });
}
}
