import { Component, ViewChild } from '@angular/core';
import { DashboardRoutingModule } from '../../dashboard/dashboard-routing.module';
import { ButtonDirective, ButtonGroupModule, ButtonModule, CollapseDirective, ContainerComponent, FormModule, GridModule, ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalToggleDirective, NavItemComponent, NavModule, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective, PopoverComponent, PopoverDirective } from '@coreui/angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectDialogComponent } from '../../project-dialog/project-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from '../../widgets/widgets.module';
import { IconModule } from '@coreui/icons-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { OffreService } from 'src/app/service/offre/offre.service';
import { offre } from 'src/app/models/offre';
import { AddOffreComponent } from './addOffre/add-offre/add-offre.component';
import { DeleteOffreComponent } from './deleteOffre/delete-offre/delete-offre.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-offre',
  standalone: true,
  imports: [DashboardRoutingModule,
    ModalToggleDirective,ModalContentComponent,
  ProjectDialogComponent,MatToolbarModule,
    MatDialogModule,
   CommonModule,
    PopoverComponent,
   ReactiveFormsModule,
   PopoverDirective,
  NavbarComponent,NavItemComponent,NavbarTogglerDirective,ContainerComponent,
  NavbarNavComponent,CollapseDirective,ButtonDirective, ButtonGroupModule, ButtonModule,
  FormModule, GridModule, NavModule,
  ModalDialogComponent,
   ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent,
   MatPaginatorModule,MatTableModule,MatIconModule,IconModule],
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.scss'
})
export class OffreComponent {
  displayedColumns: string[] = ['code', 'libelle' , 'creationDate','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<offre>();
  constructor(private snackBar:MatSnackBar,private mediaMatcher: MediaMatcher,private offreService:OffreService,private httpClient: HttpClient, public dialog: MatDialog ) {}
  async ngOnInit(): Promise<void> {
    await this.getAllOffre();
  }

  async getAllOffre(): Promise<void> {
    try {
      const data = await this.offreService.getAllOffre().toPromise();
      this.dataSource = new MatTableDataSource<offre>(data);
      this.dataSource.paginator = this.paginator;
      console.log("this.dataSource project", data);

    } catch (error) {
      console.log("there is an error", error);
      // Handle error accordingly
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isMobile(): boolean {
    return this.mediaMatcher.matchMedia('(max-width: 767px)').matches;
  }
  onAdd() {
    const dialogRef = this.dialog.open(AddOffreComponent, {
      width: this.isMobile() ? '80%' : '300px',
      data: {value:"Ajouter"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body = {
          code: result.value.code,
          libelle: result.value.libelle,
        }
        this.offreService.addOffre(body).subscribe({
          next: data => {
            this.getAllOffre();
            this.openSuccessSnackBar('Offre ajouté avec succès.');
          }, 
          error: error => {
            if (error.status === 500) { 
              this.openErrorSnackBar('Cet offre existe déjà.');
            }
          }
        });
      }
    });
  }
  onEdit(element: any) {
    const dialogRef = this.dialog.open(AddOffreComponent,
      {
        width: this.isMobile() ? '80%' : '300px',
        data: { id: element.id, code: element.code, libelle: element.libelle, creationDate:element.creationDate, value: 'Modifier' }
      });
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
        this.offreService.editOffre(body).subscribe({
          next: data => {
            this.getAllOffre();
            this.openSuccessSnackBar('Offre modifié avec succès.');
          },
          error: error => {
            if (error.status === 500) { 
              this.openErrorSnackBar('Cet offre existe déjà.');
            }
          }
        });
      }
    });
  }
  onDelete(element : any) {
    const dialogRef = this.dialog.open(DeleteOffreComponent, {
      width: '250px',
      data: {message: 'Êtes-vous sûr de supprimer ',code:element.code,value: 'Supprimer' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.offreService.onDelete(element.id).subscribe({
      next: data => {
        this.ngOnInit();
        this.openSuccessSnackBar('Offre supprimé avec succès.');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

})}
openSuccessSnackBar(message: string) {
  this.snackBar.open(message, 'Fermer', {
    duration: 3000, // Duration in milliseconds
    verticalPosition: 'top' // Display at the top
  });
}

openErrorSnackBar(message: string) {
  this.snackBar.open(message, 'Fermer', {
    duration: 3000, // Duration in milliseconds
    verticalPosition: 'top' // Display at the top
  });
}
}
