import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchFilesRoutingModule } from './search-files-routing.module';
import { MatCardModule,
  MatTableModule,
  MatPaginatorModule, 
  MatSortModule,
  MatIconModule, 
  MatButtonModule,
  MatInputModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDialogRef,
  MatCheckboxModule,
  MatTooltipModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

//Components
import { SendMailComponent, ModalComponent } from './send-mail/send-mail.component';
import { SearchFilesComponent } from './search-files/search-files.component';

//Services
import { HttpService } from '../core/http.service';
import { SearchFilesService } from './search-files.service';
import { SendMailService } from './send-mail.service';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    SearchFilesRoutingModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule,
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  declarations: [
    SearchFilesComponent, 
    SendMailComponent,
    ModalComponent
  ],
  exports:[
    MatCardModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule,
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  providers:[
    HttpService,
    SearchFilesService,
    SendMailService,
    {provide: MatDialogRef, useValue: {}},
  ],
  entryComponents: [
    SendMailComponent
  ]
})
export class SearchFilesModule { }
