import { NgModule } from '@angular/core';
import{ FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

//routes
import { UploadRoutingModule } from './upload-routing.module';

//services
import { HttpService } from '../core/http.service';
import { UploadFileService } from './upload-file.service';

//components
import { UploadFileComponent } from './upload-file/upload-file.component';
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
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    UploadRoutingModule,
    SharedModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule, 
    MatSelectModule, 
  ],
  declarations: [UploadFileComponent],
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
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
  ],
  providers:[
    UploadFileService,
    HttpService,
  ]
})
export class UploadModule { }
