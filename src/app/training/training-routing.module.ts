import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training/training.component';
import { ModalTrainingInitComponent } from './modal-training/modal-training.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/entrenador/lista',
  },
  {
    path: 'lista',
    component: TrainingComponent,
    children:[
      {
        path: 'entrenar/:id_document/:id_image',
        pathMatch: 'full',
        component: ModalTrainingInitComponent,
        outlet: 'outlet'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
