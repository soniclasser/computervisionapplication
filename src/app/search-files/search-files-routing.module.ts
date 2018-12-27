import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchFilesComponent } from './search-files/search-files.component';
import { ModalComponent } from './send-mail/send-mail.component';
 
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/buscador/archivos',
  },
  {
    path: 'archivos',
    component: SearchFilesComponent,
    children: [
      {
        path: 'enviar/:id',
        pathMatch: 'full',
        component: ModalComponent,
        outlet: 'outlet'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchFilesRoutingModule { }
