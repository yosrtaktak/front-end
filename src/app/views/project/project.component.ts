import { MatSnackBar } from '@angular/material/snack-bar';
import { LotService } from 'src/app/service/lot/lot.service';
import { LotTacheComponent } from './../LotTache/lot-tache/lot-tache.component';
import { DefaultHeaderComponent } from './../../containers/default-layout/default-header/default-header.component';
import { ProjectDeleteConfirmationComponent } from './../project-delete-confirmation/project-delete-confirmation.component';
import { ProjectsService } from './../../service/project/projects.service';
import { project } from './../../models/projects';
import { ProjectDialogComponent } from './../project-dialog/project-dialog.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
//import { AvatarModule, ButtonGroupModule, ButtonModule,  CardModule,  CollapseDirective,  CollapseModule,  FormModule, GridModule, NavModule, NavbarModule, PopoverDirective, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from '../widgets/widgets.module';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ModalComponent, ModalHeaderComponent, ModalToggleDirective,ModalContentComponent, PopoverComponent, PopoverDirective, NavbarComponent, NavItemComponent, NavbarTogglerDirective, ContainerComponent, NavbarNavComponent, CollapseDirective, ButtonDirective, ButtonGroupModule, ButtonModule, FormModule, GridModule, NavModule } from '@coreui/angular';
import { ModalDialogComponent, ModalFooterComponent, ModalBodyComponent } from '@coreui/angular';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { IconModule } from '@coreui/icons-angular';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppModule } from 'src/app/app.module';
import { NgModule } from '@angular/core'
import {ProjectDialogEdComponent} from './../project-dialog-ed/project-dialog-ed.component';
import { HttpClient } from '@angular/common/http';
import { navItems } from 'src/app/containers/default-layout/_nav';
import { Lot } from 'src/app/models/Lot';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule, MatSortHeader, matSortAnimations } from '@angular/material/sort';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [DashboardRoutingModule,MatSortModule,
     ModalToggleDirective,ModalContentComponent,
   ProjectDialogComponent,MatToolbarModule,
     MatDialogModule,MatSortModule,MatSortHeader,
    CommonModule,
     PopoverComponent,
    ReactiveFormsModule,MatSort,
    PopoverDirective,
   NavbarComponent,NavItemComponent,NavbarTogglerDirective,ContainerComponent,
   NavbarNavComponent,CollapseDirective,ButtonDirective, ButtonGroupModule, ButtonModule,
   FormModule, GridModule, NavModule,
    WidgetsModule, MatSortModule,
 ModalDialogComponent, 
    ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent,
    MatPaginatorModule,MatTableModule,MatIconModule,IconModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements AfterViewInit,OnInit  {

  displayedColumns: string[] = ['code', 'libelle' , 'creationDate','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<project>();
   lots:Lot[];
  data : project[] = [];
  projetId:number;
  /*@Input() currentUser: project = {
    code: '',
    libelle: '',
    id: 0,
    creationDate: new Date 
  }*/
  @ViewChild(MatSort) sort: MatSort;
  constructor(private mediaMatcher: MediaMatcher,private snackBar:MatSnackBar,private _liveAnnouncer: LiveAnnouncer,private LotService:LotService,private httpClient: HttpClient, public dialog: MatDialog , private projectsService:ProjectsService) {
  }
  
  async ngOnInit(): Promise<void> {
    this.dataSource.sort = this.sort;
     await this.getAllProjects();
  
   
   }
 

   ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => {
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
      
          const creationDate = new Date(data.creationDate); // Convertit la date en objet Date
          return creationDate.getTime(); // Utilise le timestamp pour le tri
       
        }
  
      })}
      isMobile(): boolean {
        return this.mediaMatcher.matchMedia('(max-width: 767px)').matches;
      }
  onMatSortChange(event: Event) {
    const sortState = event as unknown as Sort;
    if (sortState && sortState.active) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
   async getAllProjects(): Promise<void> {
    try {
      const data = await this.projectsService.getAllProjects().toPromise();
      this.dataSource = new MatTableDataSource<project>(data);
      this.dataSource.paginator = this.paginator;
      data.sort((a: project, b: project) => {
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
      });
      for (const element of data) {
        this.projetId = element.id;
       
        const lots = await this.getLotByProjetId(this.projetId);
        
      }
    } catch (error) {
      console.log("there is an error", error);
      // Handle error accordingly
    }
  }
  
  async getLotByProjetId(projetId: number): Promise<any> {
    try {
       this.lots = await this.LotService.getLotByIdProjet(projetId).toPromise();
      return this.lots.map((lot: any) => ({ id: lot.id, code: lot.code,libelle:lot.libelle }));
    } catch (error) {
      console.error('Error fetching lots:', error);
      throw error; // Rethrow the error to handle it in the caller function
    }
  }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onAdd() {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: this.isMobile() ? '80%' : '300px',
      data: 'Ajouter'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        const body = {
          code: result.value.code,
          libelle: result.value.libelle,
        }
        this.projectsService.addProject(body).subscribe({
          next: data => {
            this.getAllProjects();
            this.openSuccessSnackBar('Projet ajouté avec succès.');
          }, 
          error: error => {
            if (error.status === 500) { 
              this.openErrorSnackBar('Cet projet existe déjà.');
            }
          }
        });
      }
    });
  }
  onEdit(element: any) {
    const dialogRef = this.dialog.open(ProjectDialogEdComponent,
      {
        width: this.isMobile() ? '80%' : '300px',
        data: { id: element.id, code: element.code, libelle: element.libelle, creationDate:element.creationDate, value: 'Modifier' }
      });
      console.log(this.data);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let year;
        let month;
        let day;
        if(typeof result.value.creationDate != 'string'){
         year = result.value.creationDate.getFullYear();
         month = (result.value.creationDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
         day = result.value.creationDate.getDate().toString().padStart(2, '0');
      }

        const body = {
          id: result.value.id,
          code: result.value.code,
          libelle: result.value.libelle,
          creationDate:typeof result.value.creationDate != 'string' ?`${year}-${month}-${day}`: result.value.creationDate
        }
        console.log("body",body.creationDate)
        this.projectsService.editProject(body).subscribe({
          next: data => {
            this.getAllProjects();
            this.openSuccessSnackBar('Le projet a été modifié avec succès.');
          },
          error: error => {
            if (error.status === 500) { 
              this.openErrorSnackBar('Cet utilisateur existe déjà.');
            }
          }
        });
      }
    });
  }
  onDelete(element : any) {
    const dialogRef = this.dialog.open(ProjectDeleteConfirmationComponent, {
      width: '250px',
      data: {message: 'Êtes-vous sûr de supprimer le projet ',code:element.code,message2:'avec ces lots et taches',value: 'Supprimer' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.projectsService.onDelete(element.id).subscribe({
      next: data => {
        this.ngOnInit();
        this.openSuccessSnackBar('Le projet a été supprimé avec succès.');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

})}
viewAct(element : any){
  const dialogRef = this.dialog.open(LotTacheComponent, {
   width: '80%',
    // height: "calc(100% - 40px)",
    // width: "calc(100% - 40px)",
    // maxWidth: "100%",
    // maxHeight: "100%",
      data: { id: element.id, code: element.code ,libelle:element.libelle}
    });
  }
  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // Duration in milliseconds
      
    });
  }
  
  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top' // Display at the top
    });
}
}