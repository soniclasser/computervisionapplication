import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule,
  MatIconModule, 
  MatProgressSpinnerModule,
} from '@angular/material';

import { AngularDraggableModule } from 'angular2-draggable';

//components
import { ViewfinderComponent } from './viewfinder/viewfinder.component';

//Routers
import { ViewfinderRoutingModule } from './viewfinder-routing.module';

//services
import { ViewfinderService } from './viewfinder.service'

@NgModule({
  imports: [
    CommonModule,
    ViewfinderRoutingModule,
    MatCardModule,
    MatIconModule, 
    MatProgressSpinnerModule,
    AngularDraggableModule
  ],
  exports:[
    MatCardModule,
    MatIconModule, 
    MatProgressSpinnerModule,
    AngularDraggableModule
  ],
  declarations: [ViewfinderComponent],
  providers:[
    ViewfinderService,
  ]
})
export class ViewfinderModule { }
