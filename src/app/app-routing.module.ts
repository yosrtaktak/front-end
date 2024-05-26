import { DashAdminMensuelleComponent } from './views/DashboardAdminMensuel/dash-admin-mensuelle/dash-admin-mensuelle.component';
import { OffreComponent } from './views/offre/offre/offre.component';
import { DashUserMensuelleComponent } from './views/DashboardUserMensuelle/dash-user-mensuelle/dash-user-mensuelle.component';
import { RapportAdminComponent } from './views/rappActivite/rapportAdmin/rapport-admin/rapport-admin.component';
import { DashboardAdminComponent } from './views/DashboardAdmin/dashboard-admin/dashboard-admin.component';


import { DashboardUserComponent } from './views/DashboardUser/dashboard-user/dashboard-user.component';
import { UserComponent } from './views/user/user/user.component';
import { AddActDialogComponent } from './views/addActDialog/add-act-dialog/add-act-dialog.component';

import { RapportActiviteComponent } from './views/rappActivite/rapport-activite/rapport-activite.component';
import { ProjectComponent } from './views/project/project.component';



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ActiviteComponent } from './views/activite/activite.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 /* { path: 'users', component: UsersComponent },*/
 
  {path :'user',component : UserComponent},
  {path :'offre',component : OffreComponent},
  {path :'project',component : ProjectComponent},
  {path :'dashboardUser',component : DashboardUserComponent},
  {path :'dashboardUserMensuelle',component : DashUserMensuelleComponent},
  {path :'dashboardAdmin',component : DashboardAdminComponent},
  {path :'dashboardAdminMensuel',component : DashAdminMensuelleComponent},
  {path :'rapportAdmin',component : RapportAdminComponent},
  // {path :'activité',component : RapportActiviteComponent},
  // {path :'act',component : ActiviteComponent,outlet: 'modal',
  // children:[
  //   {path:'addAct',component :AddActDialogComponent, },
  // ]},
  { path: 'activité', component: RapportActiviteComponent },
  { path: 'activiteee',component: ActiviteComponent},
  { path: 'addAct', component:AddActDialogComponent },
   
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      /*{
        path: 'projet',
        loadChildren: () =>
          import('./admin/projects/projects.component').then((m) => m.ProjectsComponent)
      },*/
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path : 'dashboard-admin',
    component : DashboardAdminComponent,
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
