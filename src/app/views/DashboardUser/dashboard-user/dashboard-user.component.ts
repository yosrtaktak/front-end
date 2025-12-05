import { forEach } from 'lodash-es';
import { ImputationService } from './../../../service/imputation/imputation.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatColumnDef, MatFooterCell, MatFooterRowDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CalloutComponent, CardBodyComponent, CardComponent, CollapseDirective, ContainerComponent, NavItemComponent, NavLinkDirective, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective } from '@coreui/angular';
import { ChartjsComponent, ChartjsModule } from '@coreui/angular-chartjs';
import { navItems } from 'src/app/containers/default-layout/_nav';
import { project } from 'src/app/models/projects';
import { LoginService } from 'src/app/service/login.service';
import { ProjectsService } from 'src/app/service/project/projects.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RapportService } from 'src/app/service/rapport/rapport.service';
import { rapport } from 'src/app/models/rapport';
import { Chart, LinearScaleOptions } from 'chart.js';
import { DeepPartial } from 'chart.js/types/utils';
import { MonthYear } from '../../rappActivite/add-dialog/add-dialog.component';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface MonthYear1 {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CalloutComponent, CardComponent, CardBodyComponent, ReactiveFormsModule, MatOption, MatSelect, ChartjsComponent, CommonModule, MatTable, MatHeaderCell, MatColumnDef, MatPaginator, MatHeaderCellDef, MatFooterCell,
    MatRowDef, MatFooterRowDef, MatHeaderRowDef, MatCell, MatRow, MatTableModule, MatFormField, MatIcon, MatInputModule,
    ChartjsModule, NavLinkDirective, RouterLink, NavbarComponent, MatCardModule, ContainerComponent, NavLinkDirective, NavbarNavComponent, NavbarTogglerDirective, CollapseDirective, NavItemComponent],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss'
})
export class DashboardUserComponent implements OnInit {
  displayedColumns: string[] = ['Code', 'Libelle'];
  displayedColumns1: string[] = ['Code', 'Mois', 'Année'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<project>();
  dataSource1 = new MatTableDataSource<rapport>();
  data: project[] = [];
  chartLabels: project[] = [];
  projets: project[] = [];
  projetId: number;
  labels: project[] = [];
  pourcentage: any[] = [];
  data2: any;
  data3: any;
  pourcentageFormatte: number[] = [];
  pourcentageDecimal: any[] = [];
  rapports: rapport[] = [];
  yearControl = new FormControl('');
  chart: any;
  selectedYear: number;
  isEmpty = true;
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
      value: currentYear - index, // Commencer par l'année actuelle et aller en arrière
      viewValue: String(currentYear - index) // Convertir en chaîne de caractères
    };
  })
  constructor(private snackbar: MatSnackBar, private rapportService: RapportService, private projetsService: ProjectsService, public loginService: LoginService, private ImputationService: ImputationService) { this.populateYearList(); }

  async ngOnInit(): Promise<void> {

  }


  async applyFilter1(event: MatSelectChange) {
    if (this.yearControl.value !== null) {
      this.selectedYear = Number(this.yearControl.value);
    }
    this.resetCharts();
    this.projets = [];

    const data = await this.projetsService.getListeProjetByAnnee(this.selectedYear).toPromise();
    this.dataSource = new MatTableDataSource<project>(data);
    this.dataSource.paginator = this.paginator;
    if (data.length === 0) {
      this.snackbar.open('Pas de projets disponibles pour cette année.', 'Fermer', {
        duration: 2000,
        panelClass: ['notification']
      });
      return;
    }
    data.forEach((el: any) =>
      this.projets.push(el.idProjet),
    )

    this.labels = data.map((project: project) => project.code);

    this.chartLabels = this.labels;
    this.dataSource.paginator = this.paginator;


    this.updateCharts();
  }
  resetCharts() {
    this.data2 = null;
    this.data3 = null;

  }
  async updateCharts() {
    await this.getPourcentageProjetUser();
  }
  async getPourcentageProjetUser() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear()

    await this.ImputationService.getPourcentageProjetUser(this.selectedYear, this.projets, this.loginService.userId).subscribe(data => {
      this.pourcentage = data
      
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== 0) {
          this.isEmpty = false; 
        }
        break;
      }
      if (this.isEmpty) {
        this.snackbar.open('Pas de travail effectué dans cette année.', 'Fermer', {
          duration: 2000
        });
        return;
      }
      this.data2 = {
        labels: this.labels,
        datasets: [
          {

            data: data,
            backgroundColor: [
              'rgba(200, 200, 200, 0.8)',
              'rgba(100, 150, 180, 0.8)',
              'rgba(220, 180, 50, 0.8)',
              'rgba(40, 140, 140, 0.8)',
              'rgba(230, 100, 50, 0.8)',
              'rgba(30, 110, 180, 0.8)',
              'rgba(120, 60, 200, 0.8)',
              'rgba(200, 50, 70, 0.8)'
            ],

          }
        ]
      };
      this.data3 = {
        labels: this.labels,
        datasets: [
          {
            label: 'pourcentage travail sur les projets',
            data: data,
            backgroundColor: [
              'rgba(28, 86, 159, 0.8)',
            ],

          }
        ]
      };
    })

  }

  populateYearList() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 50; i--) {
      this.yearList.push({ value: i, viewValue: i.toString() });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource1.filter = filterValue.trim().toLowerCase();

  }

}
