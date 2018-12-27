import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//componen
import { QualificationComponent } from './qualification/qualification.component';
import { ModalDetailComponent, ModalDetailInitComponent } from './modal-detail/modal-detail.component';


//router
import { QualificationRoutingModule } from './qualification-routing.module';

//services
import { HelperService } from '../shared/helper.service';
import { QualificationService } from './qualification.service';
import { HttpService } from '../core/http.service';

import {
  MatDividerModule,
  MatInputModule,
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
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule, 
  MatTooltipModule
} from '@angular/material';


@NgModule({
  imports: [
    QualificationRoutingModule,
    CommonModule,
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
    NgbModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  declarations: [
    QualificationComponent,
    ModalDetailComponent,
    ModalDetailInitComponent,
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
    NgbModule,
    MatMenuModule,
    MatDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  providers:[
    HelperService,
    MatDatepickerModule,
    {provide: MatDialogRef, useValue: {}},
    QualificationService,
    HttpService,
  ],
  entryComponents: [
    ModalDetailComponent
  ]
})
export class QualificationModule { }
