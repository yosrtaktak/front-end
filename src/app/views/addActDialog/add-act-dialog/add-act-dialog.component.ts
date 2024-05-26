import { activite } from './../../../models/activite';
import { TypeService } from './../../../service/type-activite/type.service';
import { offre } from './../../../models/offre';
import { OffreService } from './../../../service/offre/offre.service';
import { type } from './../../../models/type';
import { Tache } from './../../../models/tache';
import { TacheService } from './../../../service/tache/tache.service';
import { rapport } from './../../../models/rapport';
import { Lot } from './../../../models/Lot';
import { LotService } from './../../../service/lot/lot.service';
import { HttpClient } from '@angular/common/http';
import { navItems } from './../../../containers/default-layout/_nav';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,FormControlDirective } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule, MatLabel, matFormFieldAnimations } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { ButtonModule, CollapseDirective, ContainerComponent, NavItemComponent, NavbarModule, NavbarTogglerDirective, PopoverComponent, PopoverDirective } from '@coreui/angular';
import { ProjectsService } from 'src/app/service/project/projects.service';
import { project } from 'src/app/models/projects';
import { MatTableDataSource } from '@angular/material/table';

import { forEach } from 'lodash-es';


@Component({
  selector: 'app-add-act-dialog',
  standalone: true,
  imports: [MatFormFieldModule,PopoverComponent,PopoverDirective,NavItemComponent,MatOption,MatInput,CommonModule,
  MatIcon,NavbarModule,ContainerComponent,CollapseDirective,ReactiveFormsModule,NavbarTogglerDirective,MatToolbar,MatSelect,MatDialogModule,ReactiveFormsModule,ButtonModule],
  templateUrl: './add-act-dialog.component.html',
  styleUrl: './add-act-dialog.component.scss'
})

export class AddActDialogComponent implements OnInit {
  projets:any[];
  lots:Lot[];
  taches:Tache[];
  offres:offre[];
  types:type[];
  activite:activite[];
  projetSelectionne: project;
  dataSource = new MatTableDataSource<project>();
  typeControlValue: string | null = null;
  typeListe:string[]=['projet','offre','autoFormation','conge','mission'];
  editFormgroup: FormGroup = new FormGroup({});
  selectedProjectId: number | undefined;
  projectIds:number[];
  
  constructor(private typeService:TypeService,private offreService:OffreService,private tacheService:TacheService,private lotService:LotService,private formBuilder: FormBuilder,private projectsService:ProjectsService,public dialogRef: MatDialogRef<AddActDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  async ngOnInit(): Promise<void> {
    console.log("datttttttta ==== >",this.data.yearRapport)
    this.initForm();
    await this.getAllProjects();
     const rapportid=this.data.rapport;
     console.log("rapportid",rapportid)
    await this.getALLTypes();
     this.getAllOffre();
    this.editFormgroup.get('projet')?.valueChanges.subscribe((projetId) => {
      if (projetId) {
        this.getLotByProjetId(projetId);

      }
    })
    this.editFormgroup.get('lot')?.valueChanges.subscribe((lotId) => {
        if (lotId) {
          this.getTacheByLotId(lotId);
        }
      });
   
 
      if(this.data.value == 'Modifier'){
        this.editFormgroup.patchValue({
          id:this.data.id,
          code:this.data.code,
          libelle:this.data.libelle,
          creationDate:this.data.creationDate
        })
     
      }
    } 

  

   initForm() {
    this.editFormgroup = new FormGroup({
      creationDate: new FormControl(''),
      projet: new FormControl({ value: '', disabled: true }, Validators.required),
      type: new FormControl('', Validators.required),
      offre: new FormControl({ value: '', disabled: true }, Validators.required),
      lot: new FormControl({ value: '', disabled: true }, Validators.required),
      tache: new FormControl({ value: '', disabled: true }, Validators.required),
      comment : new FormControl('')
    });
}
    // isProjetDisabled(): boolean {
    //   const typeControl = this.editFormgroup.get('type');
    //   return typeControl ? typeControl.value === 'offre' : true;
    // }
    updateType(selectedType: string) {
      this.typeControlValue = selectedType;
      
      if (selectedType !== 'offre') {
        this.editFormgroup.get('offre')?.reset();
        this.editFormgroup.get('offre')?.disable();
      } else {
        // Sinon, activer le champ "offre"
        this.editFormgroup.get('offre')?.enable();
      }
      if (selectedType !== 'projet') {
        this.editFormgroup.get('projet')?.reset();
        this.editFormgroup.get('projet')?.disable();
        this.editFormgroup.get('lot')?.reset();
        this.editFormgroup.get('lot')?.disable();
        this.editFormgroup.get('tache')?.reset();
        this.editFormgroup.get('tache')?.disable();
     
      } else {
        // Sinon, activer les champs "lot" et "tache"
        this.editFormgroup.get('projet')?.enable();
        this.editFormgroup.get('lot')?.enable();
        this.editFormgroup.get('tache')?.enable();
      }
    }

    async getProjetByRapportId(rapportId:number){
  
      try {
        this.projets = await this.projectsService.getProjetByRapportId(rapportId).toPromise();
        console.log(" this.projets",this.projets)
        this.projectIds = this.projets.map(project => project.id); // Supposons que l'ID du projet est stocké dans une propriété nommée "id"
        console.log("IDs des projets:", this.projectIds);
        
  }catch (error) {
    console.error('Une erreur est survenue lors de la récupération des projets :', error);
    throw error; // Rejette la promesse avec l'erreur
  }}
  
  async getALLTypes(){
    try { 
     this.types= await this.typeService.getAllTypes().toPromise();
     console.log("this.types",this.types)
    }catch (error) {
      console.error('Une erreur est survenue lors de la récupération des projets :', error);
      throw error; // Rejette la promesse avec l'erreur
  }
}
  async getAllProjects(): Promise<any> {
    
      try {
         this.projets = await this.projectsService.getListeProjetByAnnee(this.data.yearRapport).toPromise();
        (projets: project[]) => {
          this.projets = projets;
        this.dataSource = new MatTableDataSource<project>(projets);
        }
        console.log(this.dataSource);
        return  this.projets;
      } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des projets :', error);
        throw error; // Rejette la promesse avec l'erreur
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
    getTacheByLotId(lotId:number){
      this.tacheService.getTacheByLotId(lotId).subscribe(
        (taches:any)=>{
          this.taches = taches;
        },
        (error) => {
          console.error('Erreur lors de la récupération des lots :', error);
        }
      )
    }
    getAllOffre(){
      this.offreService.getAllOffre().subscribe(
        (offres:any)=>{
          this.offres = offres;
          console.log("this.offres",this.offres)
        },
        (error) => {
          console.error('Erreur lors de la récupération des lots :', error);
        }
      )
    }
    getOffreByRapportId(rapportId:number){
      this.offreService.getOffreByIdRapport(rapportId).subscribe(
        (offres:any)=>{
          this.offres = offres;
          console.log("this.offres",this.offres)
        },
        (error) => {
          console.error('Erreur lors de la récupération des lots :', error);
        }
      )
      }
    
    onProjectChange(): void {
      // Réagissez au changement de projet sélectionné
    debugger
      console.log('Projet sélectionné :', this.selectedProjectId);
    }
    onSubmit() {
      if (this.editFormgroup.valid) {
        // Effectuer des actions lorsque le formulaire est valide
        console.log('Formulaire soumis avec succès !');
      } else {
        // Afficher un message d'erreur ou effectuer d'autres actions pour indiquer que le formulaire est invalide
        console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
      }}
  onCancel() {
    this.dialogRef.close();
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
}
