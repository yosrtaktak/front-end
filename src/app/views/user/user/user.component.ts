import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from 'src/app/models/users';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsersService } from 'src/app/service/users.service';
import { RolesService } from 'src/app/service/roles/roles.service';
import { UserDialogComponent } from '../../user-dialog/user-dialog.component';
import { UserDeleteConfirmationComponent } from '../../user-delete-confirmation/user-delete-confirmation.component';
import { navItems } from 'src/app/containers/default-layout/_nav';
import { ButtonDirective, ButtonGroupModule, ButtonModule, CollapseDirective, ContainerComponent, FormModule, GridModule, ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalToggleDirective, NavItemComponent, NavModule, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective, PopoverComponent, PopoverDirective } from '@coreui/angular';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from '../../dashboard/dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DashboardRoutingModule,
    ModalToggleDirective,ModalContentComponent,MatToolbarModule,
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
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {
  [x: string]: any;
 
displayedColumns: string[] = ['username', 'email', 'roles','actions'];
@ViewChild(MatPaginator) paginator: MatPaginator;
dataSource = new MatTableDataSource<User>();
data: User[] = [];

  constructor(private mediaMatcher: MediaMatcher,private snackBar: MatSnackBar,private HttpClient: HttpClient, public dialog: MatDialog, private usersService: UsersService,private rolesService: RolesService) {
  }
  

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.usersService.getAllUsers().subscribe({
      next: data => {
        data.forEach((element:any) => {
          if(element.roles.length != 0){
          element.roles.map((role: any) => {
              role.name = this.mapRole(role.name)
          })}
        });
        this.dataSource = new MatTableDataSource<User>(data);
        this.mapRole(data.roles);
        this.dataSource.paginator = this.paginator;
        
      },
      error: error => {
        console.log("there is error", error);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mapRole(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'admin';
      case 'ROLE_USER':
        return 'user';
      case 'ROLE_MODERATOR':
        return 'moderator';
      default:
        return 'unknown';
    }
  }
  isMobile(): boolean {
    return this.mediaMatcher.matchMedia('(max-width: 767px)').matches;
  }
  onAdd() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: this.isMobile() ? '80%' : '300px',
      data: { value: 'Ajouter' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body = {
          username: result.value.username,
          email: result.value.email,
          role : result.value.role
        }
        console.log(body)
        this.usersService.addUser(body).subscribe({
          next: data => {
            this.getAllUsers();
            this.openSuccessSnackBar('Utilisateur ajouté avec succès.');
          },
          error: error => {
            if (error.status === 500) { 
              this.openErrorSnackBar('Cet utilisateur existe déjà.');
            } else {
              console.error("Il y a une erreur lors de l'ajout de l'utilisateur :", error);
              // Gérer l'erreur de manière appropriée
            }
          }
        });
      }
    });
  }
  onEdit(element: any) {
    const dialogRef = this.dialog.open(UserDialogComponent,
      {
        width: this.isMobile() ? '60%' : '300px',
        data: { id: element.id, username: element.username, email: element.email, 
          role:element.roles, value: 'Modifier' }
      });
      console.log(element)
    dialogRef.afterClosed().subscribe(result => {
     
      if (result) {
        const body = {
          id: result.value.id,
          username: result.value.username,
          email: result.value.email,
          role:result.value.role
        }
        
        this.usersService.editUser(body).subscribe({
          next: data => {
            this.getAllUsers();
            this.openSuccessSnackBar('Utilisateur a été modifié avec succès.');
          },
          error: error => {
            if (error.status === 500) { 
              this.openErrorSnackBar('Cet utilisateur existe déjà.');
            } else {
              console.error("Il y a une erreur lors de l'ajout de l'utilisateur :", error);
              // Gérer l'erreur de manière appropriée
            }
          }
        });
      }
    });
  }

  onDelete(element : any) {
    const dialogRef = this.dialog.open(UserDeleteConfirmationComponent, {
      width: '250px',
      data: {message: 'Êtes-vous sûr de supprimer utilisateur',username: element.username,value: 'Supprimer' }
    });
    console.log("datta",this.data)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.usersService.onDelete(element.id).subscribe({
      next: data => {
        this.openSuccessSnackBar('Utilisateur a été supprimé avec succès.');
        this.ngOnInit();
        
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }})}
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
  }}
