import { result, forEach } from 'lodash-es';
import { imputation } from './../../../models/imputation';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatColumnDef, MatFooterCell, MatFooterRowDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AlertComponent, CalloutComponent, CollapseDirective, ContainerComponent, NavItemComponent, NavLinkDirective, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective } from '@coreui/angular';
import { ChartjsComponent, ChartjsModule } from '@coreui/angular-chartjs';
import { project } from 'src/app/models/projects';
import { ImputationService } from 'src/app/service/imputation/imputation.service';
import { LoginService } from 'src/app/service/login.service';
import { ProjectsService } from 'src/app/service/project/projects.service';
import { RapportService } from 'src/app/service/rapport/rapport.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TacheService } from 'src/app/service/tache/tache.service';
import { Tache } from 'src/app/models/tache';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonDirective } from '@coreui/angular';

export interface MonthYear1 {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CalloutComponent, ButtonDirective, AlertComponent, ReactiveFormsModule, MatOption, MatSelect, CommonModule, ChartjsComponent, MatTable, MatHeaderCell, MatColumnDef, MatPaginator, MatHeaderCellDef, MatFooterCell,
    MatRowDef, MatFooterRowDef, MatHeaderRowDef, MatCell, MatRow, MatTableModule, MatFormField, MatIcon, MatInputModule,
    ChartjsModule, NavLinkDirective, RouterLink, NavbarComponent, MatCardModule, ContainerComponent, NavLinkDirective, NavbarNavComponent, NavbarTogglerDirective, CollapseDirective, NavItemComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {
  displayedColumns: string[] = ['Code', 'Libelle', 'Nombre utilisateur', 'Temps total', 'Pourcentage'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<project>();
  projets: project[] = [];
  projetsLibelle: any[] = [];
  selectedYear: number;
  nombreUtilisateur: number | undefined;
  data1: { [key: number]: any | undefined } = {};
  nombreUtilisateurData: any[] = [];
  taches: Tache[] = [];
  nombreUtilisateursParProjet: { [key: number]: any | undefined } = {};
  totalTravailParProjet: { [idProjet: number]: number } = {};
  visible = false;
  utilisateurs: any[] = [];
  totalTravail: any[] = [];
  dataChart: any;
  totalTemps: any[];
  dataPieChart: any;
  selectedTacheId: any;
  selecttache: any;
  data3: any;
  pourcentagesProjet: { [key: number]: number } = {};
  element: number;
  travail: { Total: number; idTache: number };
  resultats: { [idTache: number]: number }[] = [];
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
  yearControl = new FormControl('');
  yearList: MonthYear1[] = Array(50).fill(1).map((_, index) => {
    const currentYear = new Date().getFullYear();
    return {
      value: currentYear - index,
      viewValue: String(currentYear - index)
    };
  })
  constructor(private snackbar: MatSnackBar, private tacheService: TacheService, private rapportService: RapportService, private projetsService: ProjectsService, public loginService: LoginService, private ImputationService: ImputationService) { this.data1 = {}; }
  async ngOnInit(): Promise<void> {

    this.selectedTacheId = null;
  }

  populateYearList() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 50; i--) {
      this.yearList.push({ value: i, viewValue: i.toString() });
    }
  }
  chartVisible = false;
  async applyFilter(event: MatSelectChange) {

    if (this.yearControl.value !== null) {
      this.selectedYear = Number(this.yearControl.value);

    }
    this.taches = [];
    this.selecttache = 0;
    await this.loadProjects();
  }
  async loadProjects() {
    this.selectedProject = null;
    const data = await this.projetsService.getListeProjetByAnnee(this.selectedYear).toPromise();
    this.dataSource = new MatTableDataSource<project>(data);
    this.dataSource.paginator = this.paginator;
    if (data.length === 0) {
      this.chartVisible = false;
      this.snackbar.open('Aucun projet disponible pour cette année.', 'Fermer', {
        duration: 2000,
        panelClass:'snackbar'
      });
      return;
    }
    data.forEach((el: any) =>
      this.projets.push(el.idProjet),
    )

    data.forEach((elt: any) => {
      this.projetsLibelle.push({ id: elt.idProjet, code: elt.code });
    });
    this.projetsLibelle = data.map((project: any) => ({ id: project.idProjet, code: project.code }));

    this.visible = true;

    this.nombreUtilisateursParProjet = {};
    await this.ImputationService.getNbrUserOnProjet(this.selectedYear).toPromise().then(data => {

      this.nombreUtilisateurData = data.map((item: any) => ({
        idProjet: item.idProjet,
        nombreUtilisateur: item.Total
      }));
      this.nombreUtilisateurData.forEach((element: any) => {
        let res = this.getNombreUtilisateur(element.idProjet);
        this.calculateNombreUtilisateursParProjet(res);
      });
    })

    this.projets.forEach((el: any) => {
      this.ImputationService.calculerPourcentageTravailSurProjets(this.selectedYear, el).subscribe(pourcentage => {
        this.pourcentagesProjet[el] = pourcentage[el];
        this.data3 = {
          labels: this.projetsLibelle.map(code => code.code),
          datasets: [
            {
              label: 'pourcentage travail sur les projets',
              data: this.projetsLibelle.map(id => this.pourcentagesProjet[id.id]),
              backgroundColor: [
                'rgba(28, 86, 159, 0.8)',
              ],

            }
          ]
        };
      })

    })

    const projetPromise = this.ImputationService.getTotalProjetByAnnee(this.selectedYear, this.projets).toPromise();
    projetPromise.then((data: { [idProjet: number]: number }[]) => {
      this.dataChart = {
        labels: this.projetsLibelle,
        datasets: [
          {
            label: 'Temps de travail total pour chaque projet',
            backgroundColor: [
              'rgba(40, 140, 140, 0.8)',
            ],
            data: []
          }
        ]
      };
      data.forEach(entry => {
        Object.keys(entry).forEach((key: any) => {
          this.totalTravailParProjet[key] = entry[key];
          this.dataChart.datasets[0].data.push(entry[key]);
        });



      });
      this.chartVisible = true;
    })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);

      });

  }

  getNombreUtilisateur(idProjet: number): { idProjet: number, nombreUtilisateur: number } {
    let data1 = this.nombreUtilisateurData.find(item => item.idProjet === idProjet);
    return data1 ? { idProjet: data1.idProjet, nombreUtilisateur: data1.nombreUtilisateur } : { idProjet: idProjet, nombreUtilisateur: 0 };
  }
  calculateNombreUtilisateursParProjet(res: { idProjet: number, nombreUtilisateur: number } | undefined) {
    if (res !== undefined) {
      this.nombreUtilisateursParProjet[res.idProjet] = res;
    }
    else {
      this.nombreUtilisateursParProjet[res!.idProjet] = { idProjet: res!.idProjet, nombreUtilisateur: 0 };
    }
  }
  currentPieChart: any;

  selectedProject: any;
  async handleClickOnProjet(element: any) {
    this.selectedProject = element;
    const idProjet = element.idProjet;
    try {
      const data = await this.tacheService.getListeTacheByProjet(idProjet, this.selectedYear).toPromise();
      data.paginator = this.paginator;
      this.taches = data;
      if (data.length === 0) {
        this.dataPieChart = null;
        this.snackbar.open('Pas de tâches disponibles pour ce projet.', 'Fermer', {
          duration: 2000

        });
        return;
      }
      await this.selectedTacheId;
      data.forEach((el: any) => {
        this.tacheService.getListeUserByTache(el.id, this.selectedYear).subscribe(data1 => {
          if (data1.length === 0) {
            this.dataPieChart = null;
            this.snackbar.open('Pas de travail effectué sur cette tâche.', 'Fermer', {
              duration: 2000

            });
            return;
          }
          this.utilisateurs.push(data1)
          el.utilisateurs = data1;

        });

        this.tacheService.getTotalTravailByTache(el.id, this.selectedYear).subscribe(data2 => {
          el.totalTravail = data2;

        })

        data.forEach((el: any) => {
          this.tacheService.getTotalTravail(el.id, this.selectedYear).subscribe(data3 => {
            el.totalTemps = data3;
          },

          )
          this.ImputationService.getTotalChaqueProjetByAnnee(this.selectedYear, this.selectedProject.idProjet).toPromise()
            .then(total => {
              for (const key in total) {
                this.element = total[key][this.selectedProject.idProjet]

              }
              data.forEach((el: any) => {
                this.tacheService.getTotalTravail(el.id, this.selectedYear).subscribe(datas => {

                  this.travail = datas[0];
                  const pourcentage = (this.travail.Total / this.element) * 100;
                  const resultat: { [idTache: number]: number } = {};
                  resultat[el.id] = pourcentage;
                  this.resultats[el.id] = resultat;
                });

              });
            });
        })
        this.clearPieChart();
      });

    } catch (error) {
      console.error("Erreur lors de la récupération des tâches:", error);

    }

  }
  clearPieChart() {
    this.dataPieChart = null;

  }
  users: { idTache: number, username: string }[] = [];

  async updatePieChart() {
    if (this.selectedTacheId !== null) {
      const selectedTache = this.taches.find((tache: any) => tache.id === this.selectedTacheId);
      if (selectedTache) {
        this.users = await this.tacheService.getListeUserByTache(selectedTache.id, this.selectedYear).toPromise();

        const usernames = this.users.map(user => user.username);
        const totalTravail = await this.tacheService.getTotalTravailByTache(selectedTache.id, this.selectedYear).toPromise(); // À remplacer par la source de données appropriée si nécessaire
        const totalTravails = totalTravail.map((item: any) => item.totalTravail);
        this.dataPieChart = {
          labels: usernames,
          datasets: [{
            data: totalTravails,
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

