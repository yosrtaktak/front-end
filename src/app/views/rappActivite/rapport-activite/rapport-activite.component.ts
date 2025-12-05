import { HistoriqueService } from './../../../service/historique/historique.service';
import { SendMailService } from './../../../service/sendMail/send-mail.service';
import { HistoriqueComponent } from './../historique/historique/historique.component';
import { etat } from './../../../models/etat';
import { forEach, result } from 'lodash-es';
import { DeleteRappConfComponent } from './../delete-rapp-conf/delete-rapp-conf.component';
import { AddDialogComponent } from './../add-dialog/add-dialog.component';
import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { RapportService } from './../../../service/rapport/rapport.service';
import { rapport } from './../../../models/rapport';
import { AfterViewInit, Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { DashboardRoutingModule } from '../../dashboard/dashboard-routing.module';
import { AvatarModule, ButtonDirective, ButtonGroupModule, ButtonModule, CardModule, CollapseDirective, FormModule, GridModule, HeaderBrandComponent, HeaderComponent, HeaderNavComponent, ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalModule, ModalTitleDirective, ModalToggleDirective, NavLinkDirective, NavModule, NavbarModule, PaginationComponent, PaginationModule, PopoverComponent, PopoverModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { UserDialogComponent } from '../../user-dialog/user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../../widgets/widgets.module';
import { IconDirective, IconModule } from '@coreui/icons-angular';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DateAdapter, MatNativeDateModule, MatOption, MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { DefaultHeaderComponent } from 'src/app/containers';
import * as moment from 'moment';

import { HttpClient } from '@angular/common/http';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SidebarNavLinkPipe } from '@coreui/angular/lib/sidebar/sidebar-nav';
import { ActiviteComponent } from '../../activite/activite.component';
import { LoginService } from 'src/app/service/login.service';
import { LoginComponent } from '../../pages/login/login.component';
import { Observable, Subject } from 'rxjs';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-rapport-activite',
  standalone: true,
  imports: [DashboardRoutingModule, PaginationComponent, MatDatepickerModule, PaginationModule,
    CardModule, ModalToggleDirective, ModalContentComponent, MatIcon, PopoverComponent, PopoverModule,
    NavModule, UserDialogComponent, MatFormField, MatLabel, ModalModule, ModalToggleDirective,
    TabsModule, MatDialogModule, MatTooltipModule,
    CommonModule, ButtonDirective, MatSort,
    GridModule, CommonModule, MatOption, HeaderBrandComponent, HeaderNavComponent, HeaderComponent,
    ProgressModule, MatIconModule, ModalTitleDirective,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonGroupModule,
    ChartjsModule, NavbarModule, CollapseDirective, NavLinkDirective,
    AvatarModule, MatDialogModule,
    TableModule, MatToolbarModule,
    WidgetsModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule, MatSortModule,
    ProgressModule, IconDirective,
    TableModule,
    TabsModule,
    TabsModule, ModalDialogComponent, MatDialogModule,
    ModalComponent, ModalHeaderComponent, ModalFooterComponent, ModalBodyComponent,
    MatPaginatorModule, MatTableModule, MatIconModule, IconModule],
  templateUrl: './rapport-activite.component.html',
  styleUrl: './rapport-activite.component.scss'
})
export class RapportActiviteComponent implements OnInit, AfterViewInit {
  displayedColumns = ['code', 'Année', 'Mois', 'Etat', 'Commentaire', 'Utilisateur', 'Detail'];
  rapport: rapport[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<rapport>();
  data: rapport[] = [];
  idUsers: any[] = [];
  newEtat: String;
  newCommentaire: any;
  userModRap: String;
  updateValuesSubject = new Subject<any>();
  codeRapport: any;
  moisRapport: any;
  anneeRapport: any;
  emailAdmin: any;
  rapportId:any;
  moisEnLettres:any;
  @ViewChild('tableElement') tableElement: ElementRef
  @ViewChild(MatSort) sort: MatSort;
  constructor(private mediaMatcher: MediaMatcher,private ActiviteService: ActiviteService,private HistoriqueService:HistoriqueService,private _snackBar: MatSnackBar,private sendmailService: SendMailService, public loginService: LoginService, private httpClient: HttpClient, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private rapportService: RapportService) {
  }


  ngOnInit(): void {
    this.displayedColumns = ['code', 'Année', 'Mois', 'Etat', 'Commentaire', 'Detail'];
    if (this.loginService.userRole && this.loginService.userRole.includes('ROLE_ADMIN')) {
      // Ajouter la colonne 'Utilisateur' avant la colonne 'Detail'
      const detailIndex = this.displayedColumns.indexOf('Detail');
      if (detailIndex !== -1) {
        this.displayedColumns.splice(detailIndex, 0, 'Utilisateur');
      }
    }
    if (this.loginService.userRole && this.loginService.userRole.includes('ROLE_ADMIN')) {
      this.getAllRapport();
    } else {
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

  getAllRapport() {
    this.rapportService.getAllRapport().subscribe({
      next: (data: any[]) => {
        const dataWithMonthNames = data.map((rapport: any) => ({
          ...rapport,
          monthName: this.getMonthName(rapport.month)
        }));
  
        this.dataSource = new MatTableDataSource
        <any>(dataWithMonthNames);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        data.forEach((el: any) => {
          this.idUsers.push(el.id);
        });
      },
      error: error => {
       
      }
    });
  }

  getRapportByIdUser(userId: number) {
    this.rapportService.getRapportByIdUser(userId).subscribe({
      next: (data: any[]) => {
        // Map the month numbers to month names
        const dataWithMonthNames = data.map((rapport: any) => ({
          ...rapport,
          monthName: this.getMonthName(rapport.month)
        }));
        this.dataSource = new MatTableDataSource
        <any>(dataWithMonthNames);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }})

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
  sortData(sort: MatSort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'code': return this.compare(a.code, b.code, isAsc);
        case 'year': return this.compare(a.year, b.year, isAsc);
        case 'month': return this.compare(a.month, b.month, isAsc);
        // Add sorting for other columns if needed
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  isAdmin(): boolean {
    return !!this.loginService.userRole && this.loginService.userRole.includes('ROLE_ADMIN');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.isAdmin()) {
      // Appliquer le filtre également sur le nom d'utilisateur
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const username = data.user.username.toLowerCase();
        return username.includes(filter);
      };
    }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


  
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  isMobile(): boolean {
   
    return this.mediaMatcher.matchMedia('(max-width: 767px)').matches;
  }
  onAdd() {
    
    const dialogRef = this.dialog.open(AddDialogComponent, {
       width: this.isMobile() ? '80%' : '300px',
      data: { username: this.loginService.userName, value: 'Ajouter' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body = {
          code: result.value.code,
          year: result.value.year,
          month: result.value.month,
          comment: result.value.comment,
          etat: result.value.etat,
          user: result.value.user
        }
        this.rapportService.getRapportByMonthAndYear(result.value.month, result.value.year,this.loginService.userId)
        .subscribe({
          next: existingRapport => {
           
            if (existingRapport) {
              // Si un rapport existe déjà, afficher un message d'erreur
              this.openErrorSnackBar('Un rapport existe déjà pour ce mois et cette année.')
            } else {
              // Si aucun rapport n'existe, ajouter le nouveau rapport
              this.rapportService.addRapport(body).subscribe({
                next: data => {
                  this.getRapportByIdUser(this.loginService.userId);
                  this.openSuccessSnackBar('Rapport ajouté avec succès.');
                },
               
              });
            }
          },
          
        })}})}
  

  onEdit(element: any) {
    debugger
    let modificationsApportees = false;
    const dialogRef = this.dialog.open(EditDialogComponent,
      {
        width: this.isMobile() ? '80%' : '300px',
        data: { id: element.id, code: element.code, year: element.year, month: element.month, comment: element.comment, etat: element.etat, user: element.user, message: 'Êtes-vous sûr de valider ce rapport', value: 'Modifier' }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        modificationsApportees = true;
        const body = {
          id: result.value.id,
          code: result.value.code,
          etat: result.value.etat,
          year: result.value.year,
          month: result.value.month,
          comment: result.value.comment,
          user: result.value.user
        }
        this.rapportId=result.value.id
        this.newEtat = result.value.etat;
        this.newCommentaire = result.value.comment;
        this.userModRap = this.loginService.userName;
        this.codeRapport = result.value.code,
          this.moisRapport = result.value.month,
          this.anneeRapport = result.value.year
          this.moisEnLettres = this.getMonthName(this.moisRapport);
        if (this.loginService.userRole.includes('ROLE_ADMIN') ) {
          if (this.newEtat === "EN_COURS" && this.newCommentaire) {
          this.envoiEmailModAdmin(element.user.email);
        }
        if (this.newEtat === "CLOTURE") {
          this.envoiEmailModAdmin(element.user.email);
        }
      }
      const historiqueBody = {
          etat:this.newEtat,
          comment: this.newCommentaire,
          rapport:this.rapportId,
          user: this.userModRap,
      };
      
      this.HistoriqueService.addHistorique(historiqueBody).subscribe({
        next: data => {
          console.log("Historique ajouté avec succès");
        },
        error: error => {
          console.error("Une erreur s'est produite lors de la création de l'historique :", error);
        }
      });
        this.rapportService.editRapport(body).subscribe({
          next: data => {
            this.getAllRapport();
            this.openSuccessSnackBar('Rapport a été modifié avec succès.');
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      }



    });

  }
  getMonthName(monthNumber:any) {
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    return months[monthNumber - 1]; 
}

  envoiEmailModAdmin(email: string) {
   let message = '';
   if (this.newEtat === "CLOTURE") {
    message = 'Bonjour,\n\nNous vous informons que votre rapport du ' + this.moisEnLettres + '/' + this.anneeRapport + ' a été approuvé par votre supérieur' + '.\n\nCordialement.';
   }
   if (this.newEtat === "EN_COURS" && this.newCommentaire) {
    message = 'Bonjour,\n\nNous vous informons que votre rapport du ' + this.moisEnLettres + '/' + this.anneeRapport + ' a été refusé par votre supérieur.' + '\nVeuillez consulter le commentaire pour plus de détails'+'.\n\nCordialement.';
   }
  const mailStructure = {
      subject: 'Validation rapport mensuel',
      message: message
  };

    this.sendmailService.sendMail(email, mailStructure).subscribe(
      response => {
        console.log('E-mail envoyé avec succès:', response);
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      }
    );
  }

  envoiEmailModUtilisateur(email: string) {
    const mailStructure = {
      subject: 'Modification rapport utilisateur',
      message: 'Bonjour,\n\nNous vous informons que l\'utilsateur ' + this.userModRap +' a validé son rapport du ' + this.moisEnLettres + '/' + this.anneeRapport + '.\nMerci de vérifier le rapport et de le confirmer'+ '.\n\nCordialement.'
    };

    this.sendmailService.sendMail(email, mailStructure).subscribe(
      response => {
        console.log('E-mail envoyé avec succès:', response);
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      }
    );

  }
  validerRapport(element: any) {
  
    if (element.etat === "EN_ATTENTE") {
      this.openErrorSnackBar('Le rapport est déjà en attente de validation.');
    } else if (element.etat === "CLOTURE") {
      this.openErrorSnackBar('Le rapport a déjà été validé par l\'administrateur.');
    }else{
    let modificationsApportees = false;
    const dialogRef = this.dialog.open(EditDialogComponent,
      {
        width: this.isMobile() ? '80%' : '300px',
        data: { id: element.id, code: element.code, year: element.year, month:element.month,month1: this.getMonthName(element.month), comment: element.comment, etat: element.etat, user: element.user, message: 'Êtes-vous sûr de valider rapport du', value: 'Valider' }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        modificationsApportees = true;
        const body = {
          id: result.value.id,
          code: result.value.code,
          etat: result.value.etat,
          year: result.value.year,
          month: result.value.month,
          comment: result.value.comment,
          user: result.value.user
        }
        this.rapportId=result.value.id
        this.newEtat = result.value.etat;
        this.newCommentaire = result.value.comment;
        this.userModRap = this.loginService.userName;
        this.codeRapport = result.value.code,
          this.moisRapport = result.value.month,
          this.anneeRapport = result.value.year
          this.moisEnLettres = this.getMonthName(this.moisRapport);
          const etatExistant = element.etat;

        
        if (!this.loginService.userRole.includes('ROLE_ADMIN')) {
          const emailAdmin = "yosrtaktak6@gmail.com";
          this.envoiEmailModUtilisateur(emailAdmin);
        }
        this.rapportService.editRapport(body).subscribe({
          next: data => {
            this.getRapportByIdUser(this.loginService.userId)
            this.openSuccessSnackBar('Rapport a été validé avec succès.');
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      }
      const historiqueBody = {
        etat:this.newEtat,
        comment: this.newCommentaire,
        rapport:this.rapportId,
        user: this.userModRap,
      };
      
      this.HistoriqueService.addHistorique(historiqueBody).subscribe({
        next: data => {
          console.log("Historique ajouté avec succès");
        },
        error: error => {
          console.error("Une erreur s'est produite lors de la création de l'historique :", error);
        }
      });

    });
  }
  }
  onDelete(element: any) {
    const dialogRef = this.dialog.open(DeleteRappConfComponent, {
      width: '250px',
      data: { message: 'Êtes-vous sûr de supprimer ce rapport', value: 'Supprimer' }
    });
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
      }
    })
  }
  viewAct(element: any) {

    const dialogRef = this.dialog.open(ActiviteComponent, {
      height: "calc(100% - 20px)",
      width: "calc(100% - 20px)",
      maxWidth: "100%",
      maxHeight: "100%",
      data: { id: element.id, year: element.year, month: element.month, etat: element.etat, idUser: element.user.id, idUsers: element.idUsers }
    });
  }
  async viewHistorique(element: any) {
          const dialogRef = this.dialog.open(HistoriqueComponent, {
            width: this.isMobile() ? '80%' : '80%',
            data: { rapportId: element.id, newEtat: this.newEtat, commentaire: this.newCommentaire, userModRap: this.userModRap }
          });

   
        }

  openSuccessSnackBar(message: string) {
    this._snackBar.open(message, 'Fermer', {
      duration: 3000, // Duration in milliseconds
    });
  }
  
  openErrorSnackBar(message: string) {
    this._snackBar.open(message, 'Fermer', {
      duration: 3000, // Duration in milliseconds
    });
}
}