import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalDetailInitComponent } from './modal-detail/modal-detail.component';
import { QualificationComponent } from './qualification/qualification.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/calificar/archivos',
  },
  {
    path: 'archivos',
    component: QualificationComponent,
    children: [
      {
        path: 'editar/:id',
        pathMatch: 'full',
        component: ModalDetailInitComponent,
        outlet: 'outlet'
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualificationRoutingModule { }
