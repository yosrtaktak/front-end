import { forEach } from 'lodash-es';
import { imputation } from './../../../models/imputation';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { MatCell, MatColumnDef, MatFooterCell, MatFooterRowDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AlertComponent, CollapseDirective, ContainerComponent, NavItemComponent, NavLinkDirective, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective, ButtonDirective, CalloutComponent } from '@coreui/angular';
import { ChartjsComponent, ChartjsModule } from '@coreui/angular-chartjs';
import { project } from 'src/app/models/projects';
import { ImputationService } from 'src/app/service/imputation/imputation.service';
import { LoginService } from 'src/app/service/login.service';
import { ProjectsService } from 'src/app/service/project/projects.service';
import { RapportService } from 'src/app/service/rapport/rapport.service';
import { TacheService } from 'src/app/service/tache/tache.service';
import { Tache } from 'src/app/models/tache';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface MonthYear1 {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-dash-admin-mensuelle',
  standalone: true,
  imports: [CalloutComponent,ButtonDirective,AlertComponent,ReactiveFormsModule,MatOption,MatSelect,CommonModule, ChartjsComponent, MatTable, MatHeaderCell, MatColumnDef, MatPaginator, MatHeaderCellDef, MatFooterCell,
    MatRowDef, MatFooterRowDef, MatHeaderRowDef, MatCell, MatRow, MatTableModule, MatFormField, MatIcon, MatInputModule,
    ChartjsModule, NavLinkDirective, RouterLink, NavbarComponent, MatCardModule, ContainerComponent, NavLinkDirective, NavbarNavComponent, NavbarTogglerDirective, CollapseDirective, NavItemComponent],
  templateUrl: './dash-admin-mensuelle.component.html',
  styleUrl: './dash-admin-mensuelle.component.scss'
})
export class DashAdminMensuelleComponent implements OnInit{
  displayedColumns: string[] = ['Code', 'Libelle','Nombre utilisateur','Temps total','Pourcentage'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<project>();
  selectedYear:number;
  selectedMonth:number;
  dataPieChart: any;
  visible = false;
  element: number;
  tache:Tache[]=[];
  projetsLibelle: any[] = [];
  utilisateurs: any[] = [];
  totalTemps: any[];
  pourcentageProjet:any[];
  pourcentagesDesProjets: { [key: number]: number } = {};
  projets:any[]=[];
  nombreUtilisateursParProjet: { [key: number]: any | undefined } = {};
  nombreUtilisateurData: any[] = [];
  data3:any;
  selectedTacheId: any;
  selecttache: any;
  travail: { Total: number; idTache: number };
  resultats: { [idTache: number]: number }[] = [];
  yearControl = new FormControl('');
  monthControl = new FormControl('');
  monthList: MonthYear1[] = [
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
  yearList: MonthYear1[] = Array(50).fill(1).map((_, index) => {
    const currentYear = new Date().getFullYear();
    return {
      value: currentYear - index, 
      viewValue: String(currentYear - index) 
    };
  })
  constructor(private snackbar: MatSnackBar,private tacheService:TacheService,private rapportService: RapportService, private projetsService: ProjectsService, public loginService: LoginService, private ImputationService: ImputationService) { }
  ngOnInit(): void {

  }
  chartVisible = false;
  async applyFilter(event: MatSelectChange) {

    if (this.yearControl.value !== null ) {
      this.selectedYear = Number(this.yearControl.value);
     
  }
  if(this.monthControl.value!==null){
    this.selectedMonth = Number(this.monthControl.value);
  }
  this.dataSource = new MatTableDataSource<project>([]);
  this.dataSource.paginator = this.paginator;
  this.tache = [];
  this.selecttache = 0;
  this.chartVisible = false;
  this.selectedProject = null;
  this.projetsService.getListeProjetByMonth(this.selectedYear,this.selectedMonth).toPromise().then(data => {
   if (this.selectedYear !== null && this.selectedMonth !== null) {
   if (data.length === 0) {
    
    this.snackbar.open('Pas de projets disponibles pour cette date.', 'Fermer', {
      duration: 2000
    });
    return;
  }
}
   this.dataSource = new MatTableDataSource<project>(data);
   this.dataSource.paginator = this.paginator;

   data.forEach((el:any)=>{
    this.projetsService.getTotalProjetByMois(this.selectedYear, this.selectedMonth,el.idProjet).subscribe(data1 => {
      el.totalTemps=data1;
  })
  this.projetsLibelle = [];
  this.pourcentagesDesProjets = {};
  data.forEach((el:any)=>{
    this.projetsLibelle.push({ id: el.idProjet, code: el.code });
    this.ImputationService.calculerPourcentageTravailSurProjetsByMonth(el.idProjet,this.selectedMonth,this.selectedYear).subscribe(data2=>{
      el.pourcentageProjet=data2;
      this.pourcentagesDesProjets[el.idProjet]=data2[el.idProjet]
      if (this.projetsLibelle.length === data.length) {
        this.generateChartData();
      }
 
    })
  })
   Promise.all(data.map((el: any) =>
    this.projetsService.getListeUserOnProjetByMonth(el.idProjet,this.selectedMonth,this.selectedYear,).toPromise()
  )).then(allData1 => {
    this.nombreUtilisateurData = allData1.flat().map((item: any) => ({
      idProjet: item.idProjet,
      Total: item.Total
    }));

  

  
    this.nombreUtilisateurData.forEach((element: any) => {
      this.calculateNombreUtilisateursParProjet(element);
    });
  });
},(error: any) => {
        console.error("Error fetching data for projet:", error);
       })
  })}
  generateChartData() {
    this.data3 = {
      labels: this.projetsLibelle.map(code => code.code),
      datasets: [
        {
          label: 'pourcentage travail sur les projets',
          data: this.projetsLibelle.map(projet => this.pourcentagesDesProjets[projet.id]),
          backgroundColor: [
            'rgba(28, 86, 159, 0.8)',
          ],


        }
      ]
    };
    this.chartVisible = true;
  }
 calculateNombreUtilisateursParProjet(element: any) {
  
  const { idProjet,Total } = element;

  if (this.nombreUtilisateursParProjet[idProjet]) {
    
    this.nombreUtilisateursParProjet[idProjet].Total = Total;
  } else {

    this.nombreUtilisateursParProjet[idProjet] = { idProjet, Total };
  }
}
currentPieChart: any;
users: { idTache: number, username: string }[] = [];
selectedProject: any;
async handleClickOnProjet(element: any) {
  this.dataPieChart=null;
  this.selectedProject = element;
  const idProjet = element.idProjet;

  const data = await this.tacheService.getListeTacheByProjetByMonth(idProjet,this.selectedMonth,this.selectedYear).toPromise();
  this.tache=data;
  data.paginator = this.paginator;

  data.forEach((el: any) => {
    this.tacheService.getListeUserByTacheAndMonth(el.id,this.selectedMonth,this.selectedYear).subscribe(data1 => {
      this.utilisateurs.push(data1)
      el.utilisateurs = data1;
    
    });
    this.tacheService.getTotalTravailByTacheAndMonth(el.id,this.selectedMonth,this.selectedYear).subscribe(data2 => {
      el.totalTravail = data2;

    })
    this.tacheService.getTotalTravailTacheByMonth(el.id,this.selectedMonth,this.selectedYear).subscribe(data3 => {
      el.totalTemps = data3;
    },)

    this.projetsService.getTotalProjetByMois(this.selectedYear, this.selectedMonth,this.selectedProject.idProjet).toPromise()
    .then(total => {
      this.element = total.map((item:any) => item.totalTravail);

      data.forEach((el: any) => {
        this.tacheService.getTotalTravailTacheByMonth(el.id,this.selectedMonth,this.selectedYear).subscribe(datas => {

          this.travail = datas[0];
          const pourcentage = (this.travail.Total / this.element) * 100;
          const resultat: { [idTache: number]: number } = {};
          resultat[el.id] = pourcentage;
          this.resultats[el.id] = resultat;

        });

      });
    });
    this.clearPieChart();
})
}

clearPieChart() {
  this.dataPieChart = null;

}

async updatePieChart() {
  if (this.selectedTacheId !== null) {
    const selectedTache = this.tache.find((tache: any) => tache.id === this.selectedTacheId);
    if (selectedTache) {
  
      for (const el of this.tache) {
        this.users = await this.tacheService.getListeUserByTacheAndMonth(selectedTache.id,this.selectedMonth,this.selectedYear).toPromise();
        this.users.map(user => user.username);
        const totalTravail = await this.tacheService.getTotalTravailByTacheAndMonth(selectedTache.id,this.selectedMonth, this.selectedYear).toPromise();

        const totalTravails = totalTravail.map((item: any) => item.totalTravail);
        this.dataPieChart = {
          labels:  this.users.map(user => user.username),
          datasets: [{
            data: this.users.map(user => {
              const foundUser = totalTravail.find((item:any) => item.username === user.username);
              return foundUser ? foundUser.totalTravail : 0; 
            }),
            backgroundColor: [
              'rgba(0, 123, 255, 0.8)',    // Bleu vif
              'rgba(255, 99, 132, 0.8)',    // Rose clair
              'rgba(54, 162, 235, 0.8)',    // Bleu ciel
              'rgba(255, 206, 86, 0.8)',    // Jaune doux
              'rgba(75, 192, 192, 0.8)',    // Vert pastel
              'rgba(153, 102, 255, 0.8)',   // Violet clair
              'rgba(255, 159, 64, 0.8)',    // Orange doux
              'rgba(255, 64, 129, 0.8)',    // Rose pastel
              'rgba(0, 204, 204, 0.8)',     // Cyan clair
              'rgba(255, 152, 0, 0.8)',     // Orange vif
            ],
          }],
        };
      }
      this.chartVisible = true;
    }
  } else {
    this.chartVisible = false;
  }
}

selectTache(tache: any) {
  this.selecttache = tache;
  this.selectedTacheId = tache.id;
  this.updatePieChart();
}
}