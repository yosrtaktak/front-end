import { forEach } from 'lodash-es';
import { rapport } from './../../../models/rapport';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCell, MatColumnDef, MatFooterCell, MatFooterRowDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, UrlSegment } from '@angular/router';
import { AlertComponent, CalloutComponent, CardBodyComponent, CardComponent, CollapseDirective, ContainerComponent, NavItemComponent, NavLinkDirective, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective, ButtonDirective } from '@coreui/angular';
import { ChartjsComponent, ChartjsModule } from '@coreui/angular-chartjs';
import { project } from 'src/app/models/projects';
import { ImputationService } from 'src/app/service/imputation/imputation.service';
import { LoginService } from 'src/app/service/login.service';
import { ProjectsService } from 'src/app/service/project/projects.service';
import { RapportService } from 'src/app/service/rapport/rapport.service';
import { Observable, catchError, forkJoin, from, tap, throwError } from 'rxjs';




@Component({
  selector: 'app-dash-user-mensuelle',
  standalone: true,
  imports: [ButtonDirective,CalloutComponent,CardBodyComponent,CardComponent,AlertComponent,CommonModule, ChartjsComponent, CommonModule, MatTable, MatHeaderCell, MatColumnDef, MatPaginator, MatHeaderCellDef, MatFooterCell,
    MatRowDef, MatFooterRowDef, MatHeaderRowDef, MatCell, MatRow, MatTableModule, MatFormField, MatIcon, MatInputModule,
    ChartjsModule, NavLinkDirective, RouterLink, NavbarComponent, MatCardModule, ContainerComponent, NavLinkDirective, NavbarNavComponent, NavbarTogglerDirective, CollapseDirective, NavItemComponent],
  templateUrl: './dash-user-mensuelle.component.html',
  styleUrl: './dash-user-mensuelle.component.scss'
})
export class DashUserMensuelleComponent implements OnInit {
  displayedColumns: string[] = ['Code', 'Mois', 'Année'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<rapport>();
  data: project[] = [];
  chartLabels: project[] = [];
  projets: project[] = [];
  projetsLibelle:  any[] = [];
  projetsLibelles: String[] = [];
  projetId: number;
  projetIds:project[]=[];
  projetMonth:project[]=[];
  annees: number[] = [];
  mois: number[] = [];
  pourcentage: number[] = [];
  data2: any;
  data3: any;
  data4: any;
  labels: string[] = [];
  rapports: rapport[] = [];
  datarapports: number[] = [];
  showChart: boolean = false;
  userId:number;
  selectedRapport:any;
  selectedMonthRapport:any;
  selectedYearRapport:any;
  datarapport: { [id: string]: number };
  pourcentages: any[] = [];
  constructor(private snackbar: MatSnackBar,private rapportService: RapportService, private projetsService: ProjectsService, public loginService: LoginService, private ImputationService: ImputationService) { }
  async ngOnInit(): Promise<void> {
   
   await this.getRapportByUser();
 
    
  }
 
async getRapportByUser(): Promise<void> {
  const Year = new Date().getFullYear();
 
  const data = await this.rapportService.getRapportByYear(Year,this.loginService.userId).toPromise();
  this.rapports = data;
  this.dataSource = new MatTableDataSource<rapport>(data);
  this.dataSource.paginator = this.paginator;
  if (data.length === 0) {
    this.showChart=false;
      this.snackbar.open('Vous ne possédez pas encore de rapports.', 'Fermer', {
        duration: 2000 
      });
      return; 
    }
  const currentYear = new Date().getFullYear();
  const projectsData = await this.projetsService.getListeProjetDeUserByYear(this.loginService.userId, currentYear).toPromise();
  this.projetIds = projectsData;
  projectsData.forEach((elt:any)=>{
    this.projetsLibelle.push({ id: elt.idProjet, code: elt.code,libelle:elt.libelle });})
  const labels: any[]= [];
  for (const el of data) {
      labels.push({ id: el.id, code: el.code });
      
      for (const project of projectsData) {
          const pourcentage = await this.ImputationService.getPourcentageUserRapport(project.idProjet, el.id, this.loginService.userId).toPromise();
            this.pourcentages.push({
              idRapport: pourcentage.idRapport,
              idProjet:pourcentage.idProjet,
              pourcentage: pourcentage.pourcentage
          });
        } 
        const colors = [
          'rgba(100, 150, 180, 0.8)',
          'rgba(220, 180, 50, 0.8)',
          'rgba(40, 140, 140, 0.8)',
          'rgba(230, 100, 50, 0.8)',
          'rgba(30, 110, 180, 0.8)',
          'rgba(120, 60, 200, 0.8)',
          'rgba(200, 50, 70, 0.8)',
          'rgba(200, 200, 200, 0.8)',
      ];
    
        this.data4 = {
          labels: labels.map(code => code.code),
          datasets: this.projetsLibelle.map((elt,index) => {
            const pourcentages = this.pourcentages.filter(p => p.idProjet === elt.id);
            const rapports = pourcentages.map(p => p.idRapport);
            const idRapportsCorrespondants = labels.filter(label => rapports.includes(label.id));
        
            return {
              label: elt.libelle, 
              backgroundColor: colors[index % colors.length], 
              borderColor: colors[index % colors.length].replace('0.8', '1'),
              pointBackgroundColor: colors[index % colors.length].replace('0.8', '1'),
              pointBorderColor: '#fff',
              data: idRapportsCorrespondants.map(label => {
                const pourcentage = pourcentages.find(p => p.idRapport === label.id);
                return pourcentage ? pourcentage.pourcentage : null;
              }) 
            };
          })
        };
      }

}
async handleClickOnRapport(element: any) {
  this.selectedMonthRapport = element.month;
  this.selectedYearRapport = element.year;
  this.selectedRapport = element;
  this.data2 = null;
  const data1 = await this.projetsService.getListeProjetDeUserByMonth(this.loginService.userId, this.selectedRapport.id, this.selectedYearRapport).toPromise();
  this.projetMonth=data1;
  data1.forEach((el: any) =>
        this.projets.push(el.idProjet),
      )
      data1.forEach((el: any) =>
        this.projetsLibelle.push({ id: el.idProjet, libelle: el.libelle })
      )
      this.projetsLibelle = data1.map((project: project) => project.libelle);

  if (data1.length === 0) {
    this.showChart=false;
      this.snackbar.open('Pas de travail effectué pour ce mois.', 'Fermer', {
        duration: 2000 
      });
      return; 
    }
  
  const rapportId = element;
  const projetsIds = data1.map((el: any) => el.idProjet);

  const pourcentagesPromises = projetsIds.map((id:any) => {
      return this.ImputationService.getPourcentageUserRapport(id, element.id, this.loginService.userId).toPromise();
  });

  const pourcentages = await Promise.all(pourcentagesPromises);
  const uniqueProjectIds = Array.from(new Set(pourcentages.map(p => p.idProjet)));
const pieChartData = uniqueProjectIds.map(id => {
    const projectPourcentages = pourcentages.filter(p => p.idProjet === id);
    const totalPourcentage = projectPourcentages.reduce((acc, cur) => acc + cur.pourcentage, 0);
    return {
        idProjet: id,
        totalPourcentage: totalPourcentage
    };
});
const colors = [
  'rgba(100, 150, 180, 0.8)',
  'rgba(220, 180, 50, 0.8)',
  'rgba(40, 140, 140, 0.8)',
  'rgba(230, 100, 50, 0.8)',
  'rgba(30, 110, 180, 0.8)',
  'rgba(120, 60, 200, 0.8)',
  'rgba(200, 50, 70, 0.8)',
  'rgba(200, 200, 200, 0.8)',
];
this.data2 = {
  labels: pieChartData.map(data => {
      const project = data1.find((project:any) => project.idProjet === data.idProjet);
      return project ? project.libelle : '';
  }),
  datasets: [{
      data: pieChartData.map(data => data.totalPourcentage),
      backgroundColor: colors.slice(0, pieChartData.length),
}]
};
           this.processChartData(data1);
          this.showChart = true;
      }
async processChartData(data1: any[]): Promise<void> {
  this.projets = [];
  this.projetsLibelle = data1.map((project: any) => project.code);
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}