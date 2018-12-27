import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewfinderComponent } from './viewfinder/viewfinder.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/subir/archivos',
  },
  {
    path: 'documento',
    component: ViewfinderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewfinderRoutingModule { }
