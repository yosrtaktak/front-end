import { INavData } from '@coreui/angular';

export const navItemsUser: INavData[] = [
  {
    name :'Planning',
    url :'/Planning',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name :'Dashboard utilisateur',
       
        children: [
          {
            name: 'Dashboard Annuel',
            url: 'dashboardUser'
          },
          {
            name :'Dashboard Mensuel',
            url :'/dashboardUserMensuelle',
          },
      ]},
        {
            name :'Rapport activités',
            url :'/activité',
        },

      // {
      //   name :'liste des taches',
      //   url :'/task',
      // },
      // {
      //   name :'Task Detail',
      //   url :'/DetailTask',
      // },
      // {
      //   name :'Scheduler',
      //   url :'/DetailTask',
      // },

    ]
  },
]