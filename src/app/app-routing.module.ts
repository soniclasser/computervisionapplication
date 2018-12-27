import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path: 'subir',
    loadChildren: './upload/upload.module#UploadModule',
    data: {
      titulo: 'Subir archivo'
    }
  },
  {
    path: '',
    redirectTo: 'subir',
    pathMatch: 'full',
  },
  {
    path: 'bandeja-documentos',
    loadChildren: './mailbox/mailbox.module#MailboxModule',
    data: {
      titulo: 'Bandeja de documentos'
    }
  },
  {
    path: 'calificar',
    loadChildren: './qualification/qualification.module#QualificationModule',
    data: {
      titulo: 'Calificacion'
    }
  },
  {
    path: 'buscador',
    loadChildren: './search-files/search-files.module#SearchFilesModule',
    data: {
      titulo: 'Buscador'
    }
  },
  {
    path: 'entrenador',
    loadChildren: './training/training.module#TrainingModule',
    data: {
      titulo: 'Entrenador'
    }
  },
  {
    path: 'visor',
    loadChildren: './viewfinder/viewfinder.module#ViewfinderModule',
    data: {
      titulo: 'visor'
    }
  },
  {
    path: 'pagina-no-encontrada',
    component: PageNotFoundComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pagina-no-encontrada',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
