import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//routes
import { MailboxRoutingModule } from './mailbox-routing.module';

//components
import { MailboxComponent } from './mailbox/mailbox.component';

//sevices
import { MailboxService } from  './mailbox.service';


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
} from '@angular/material';

//services
import { HelperService } from '../shared/helper.service';

@NgModule({
  imports: [
    CommonModule,
    MailboxRoutingModule,
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
    NgbModule
  ],
  declarations: [
    MailboxComponent,
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
  ],
  providers:[
    HelperService,
    MailboxService,
    {provide: MatDialogRef, useValue: {}}
  ],
})
export class MailboxModule { }
