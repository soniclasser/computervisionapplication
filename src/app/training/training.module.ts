import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training/training.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
  MatDividerModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule, 
  MatButtonModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule, 
  MatSortModule,
  MatDialogModule,
  MatDialogRef,
  MatGridListModule,
  MatSelectModule,
} from '@angular/material';
import { HelperService } from '../shared/helper.service';
import { ModalTrainingComponent,  ModalTrainingInitComponent} from './modal-training/modal-training.component';


//routes
import { TrainingRoutingModule } from './training-routing.module';

//services
import  { TrainingService } from './training.service';

@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    TrainingRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule
  ],
  declarations: [
    TrainingComponent,
    ModalTrainingComponent,
    ModalTrainingInitComponent,
  ],
  exports:[
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule, 
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule
  ],
  providers:[
    HelperService,
    TrainingService,
    {provide: MatDialogRef, useValue: {}}
  ],
  entryComponents: [
    ModalTrainingComponent
  ]
})
export class TrainingModule { }
