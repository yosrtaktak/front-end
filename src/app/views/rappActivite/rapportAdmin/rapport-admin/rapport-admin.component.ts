import { HistoriqueService } from './../../../../service/historique/historique.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarModule, ButtonDirective, ButtonGroupModule, ButtonModule, CardModule, CollapseDirective, FormModule, GridModule, HeaderBrandComponent, HeaderComponent, HeaderNavComponent, ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalModule, ModalTitleDirective, ModalToggleDirective, NavLinkDirective, NavModule, NavbarModule, PaginationComponent, PaginationModule, PopoverComponent, PopoverModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { rapport } from 'src/app/models/rapport';
import { LoginService } from 'src/app/service/login.service';
import { RapportService } from 'src/app/service/rapport/rapport.service';
import { ActiviteComponent } from 'src/app/views/activite/activite.component';
import { DashboardRoutingModule } from 'src/app/views/dashboard/dashboard-routing.module';
import { UserDialogComponent } from 'src/app/views/user-dialog/user-dialog.component';
import { WidgetsModule } from 'src/app/views/widgets/widgets.module';
import { DeleteRappConfComponent } from '../../delete-rapp-conf/delete-rapp-conf.component';
import { AddDialogComponent } from '../../add-dialog/add-dialog.component';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { HistoriqueComponent } from '../../historique/historique/historique.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserIdServiceService } from 'src/app/service/userIdService/user-id-service.service';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-rapport-admin',
  standalone: true,
  imports: [DashboardRoutingModule,PaginationComponent,MatDatepickerModule,PaginationModule,
    CardModule, ModalToggleDirective, ModalContentComponent,MatIcon,PopoverComponent,PopoverModule,
    NavModule, UserDialogComponent ,MatFormField,MatLabel,ModalModule,ModalToggleDirective,
    TabsModule, MatDialogModule,MatTooltipModule,
    CommonModule,ButtonDirective,MatSort, 
    GridModule,CommonModule,MatOption,HeaderBrandComponent,HeaderNavComponent,HeaderComponent,
    ProgressModule,MatIconModule,ModalTitleDirective,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonGroupModule,
    ChartjsModule,NavbarModule,CollapseDirective,NavLinkDirective,
    AvatarModule,MatDialogModule,
    TableModule,MatToolbarModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,MatSortModule,
    ProgressModule,
    TableModule,
    TabsModule,
    TabsModule, ModalDialogComponent,MatDialogModule,
    ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent,
    MatPaginatorModule, MatTableModule, MatIconModule, IconModule],
  templateUrl: './rapport-admin.component.html',
  styleUrl: './rapport-admin.component.scss'
})
export class RapportAdminComponent implements AfterViewInit,OnInit {
  displayedColumns = ['code','Année', 'Mois', 'Etat', 'Commentaire','Utilisateur','Detail'];
  rapport:rapport[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource =new MatTableDataSource<rapport>();
  data : rapport[]=[];
  idUsers: any[]=[];
  newEtat:String;
  newCommentaire:string;
  userModRap:String;
  sortedData:rapport[];
  userId: number;
  constructor(private mediaMatcher: MediaMatcher,private ActiviteService: ActiviteService,private HistoriqueService:HistoriqueService,private userIdService: UserIdServiceService,private _snackBar: MatSnackBar,public loginService:LoginService,private httpClient: HttpClient,private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog, private rapportService : RapportService) {
    console.log("loginService ",loginService.jwtToken);
    
  }


  ngOnInit(): void {
    this.userId = this.userIdService.getUserId();
    console.log("this.userId",this.userId)
    this.displayedColumns = ['code', 'Année', 'Mois', 'Etat', 'Commentaire', 'Detail'];
    if (this.loginService.userRole && this.loginService.userRole.includes('ROLE_ADMIN')) {
      // Ajouter la colonne 'Utilisateur' avant la colonne 'Detail'
      const detailIndex = this.displayedColumns.indexOf('Detail');
      if (detailIndex !== -1) {
        this.displayedColumns.splice(detailIndex, 0, 'Utilisateur');
      }
    }
    if (this.loginService.userRole && this.loginService.userRole.includes('ROLE_ADMIN')) {
     this.getRapportByIdUser(this.loginService.userId);
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => {
      // Gérer le tri personnalisé ici
      // Par exemple, trier par année puis par mois
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
        switch (sortHeaderId) {
          case 'Année': return data.year;
          case 'Mois': return data.month;
          default: return data[sortHeaderId];
        }
      };
    });
  }
  getRapportByIdUser(userId:number){
    this.rapportService.getRapportByIdUser(userId).subscribe({
      next : data =>{
        const dataWithMonthNames = data.map((rapport: any) => ({
          ...rapport,
          monthName: this.getMonthName(rapport.month)
        }));
        this.dataSource = new MatTableDataSource
        <any>(dataWithMonthNames);
        this.dataSource.paginator = this.paginator;
        console.log("datttaattat",this.dataSource)
        this.applyFilterToDataSource(); 

      }
    })
  }
  getAllRapport(){
    this.rapportService.getAllRapport().subscribe({
      next: data => {
        const dataWithMonthNames = data.map((rapport: any) => ({
          ...rapport,
          monthName: this.getMonthName(rapport.month)
        }));
        this.dataSource = new MatTableDataSource<rapport>(data);
        this.dataSource.paginator = this.paginator;
        data.forEach((el:any)=>{
          this.idUsers.push(el.id)
        })
    
        this.applyFilterToDataSource(); 
      },
    })}
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
    getMonthName(monthNumber:any) {
      const months = [
          "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ];
      return months[monthNumber - 1]; 
  }
    applyFilterToDataSource() {
      // Appliquer le filtre si un filtre est déjà défini
      if (this.dataSource.filter) {
        this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();
      }
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    
     
        // Appliquer le filtre également sur le nom d'utilisateur
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const username = data.user.username.toLowerCase();
          return username.includes(filter);
   
      }
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    @ViewChild(MatSort) sort: MatSort;

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState:Sort){
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
    isMobile(): boolean {
      return this.mediaMatcher.matchMedia('(max-width: 767px)').matches;
    }
    onAdd(){
      const dialogRef = this.dialog.open(AddDialogComponent, {
        width: this.isMobile() ? '80%' : '300px',
      data: {username:this.loginService.userName ,value: 'Ajouter'}
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body = {
          code:result.value.code,
          year: result.value.year,
          month: result.value.month,
          comment:result.value.comment,
          etat :result.value.etat,
          user:result.value.user
        }
        this.rapportService.getRapportByMonthAndYear(result.value.month, result.value.year,this.loginService.userId)
        .subscribe(existingRapport => {
          if (existingRapport) {
            this._snackBar.open('Un rapport existe déjà pour ce mois et cette année.', 'Fermer', {
              duration: 2000, // Durée d'affichage du snackbar en ms
            });
          }
       else {
            this.rapportService.addRapport(body).subscribe({
              next: data => {
                this.getRapportByIdUser(this.loginService.userId);
                this.openSuccessSnackBar('Rapport ajouté avec succès.');
              },
              error: error => {
                console.log("Une erreur s'est produite lors de l'ajout du rapport :", error);
              }
            });
          }
        });
    }
  });
}


    onEdit(element: any) {
      const dialogRef = this.dialog.open(EditDialogComponent,
        {
          width: this.isMobile() ? '80%' : '300px',
          data: {id:element.id,code:element.code,year:element.year,month:element.month,comment:element.comment,etat:element.etat,user:element.user,value:'Modifier'}
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log("results",result)
        if (result) {
          const body = {
            id: result.value.id,
            code:result.value.code,
            etat:result.value.etat,
            year:result.value.year,
            month:result.value.month,
            comment:result.value.comment,
            user:result.value.user
          }
          this.newEtat = result.value.etat;
          this.newCommentaire=result.value.comment;
          this.userModRap=this.loginService.userName;
          this.rapportService.editRapport(body).subscribe({
            next: data => {
              this.getRapportByIdUser(this.loginService.userId)
              this.openSuccessSnackBar('Rapport a été modifié avec succès.');
            },
            error: error => {
              console.error('There was an error!', error);
            }
          });
        }
      });
    }
    onDelete(element : any) {
      const dialogRef = this.dialog.open(DeleteRappConfComponent, {
        width: '250px',
        data: {message: 'Êtes-vous sûr de supprimer ce rapport',value: 'Supprimer' }
      });
      console.log("datta",this.data)
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
      this.rapportService.onDelete(element.id).subscribe({
        next: data => {
          this.ngOnInit();
          this.openSuccessSnackBar('Rapport a été supprimé avec succès.');
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }})}
    viewAct(element : any){

      const dialogRef = this.dialog.open(ActiviteComponent, {
          // width: '2000px',
          height: "calc(100% - 20px)",
          width: "calc(100% - 20px)",
          maxWidth: "100%",
          maxHeight: "100%",
          data: { id:element.id,year:element.year,month:element.month,idUser:element.user.id,idUsers:element.idUsers }
        });
      }
    
      viewHistorique(element: any){
    
              const dialogRef = this.dialog.open(HistoriqueComponent, {
                width: "80%",
                data: { rapportId: element.id, newEtat: this.newEtat, commentaire: this.newCommentaire, userModRap: this.userModRap }
              });
            }
         
      openSuccessSnackBar(message: string) {
        this._snackBar.open(message, 'Fermer', {
          duration: 2000, // Duration in milliseconds
        });
      }
      
      openErrorSnackBar(message: string) {
        this._snackBar.open(message, 'Fermer', {
          duration: 2000, // Duration in milliseconds
        });
    }
}
