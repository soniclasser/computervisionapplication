import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/subir/archivos',
    },
    {
        path: 'archivos',
        component: UploadFileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UploadRoutingModule { }
