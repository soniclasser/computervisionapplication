import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FileBase64InputComponent } from './file-base64-input/file-base64-input.component';
import { MatIconModule,
        MatButtonModule
 } from '@angular/material';

import { ToastrModule } from 'ngx-toastr';
import { HelperService } from './helper.service';
import { HttpService } from '../core/http.service';
import { FileService } from '../shared/file.service';
import { ImgMapComponent } from 'ng2-img-map';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: true,
      tapToDismiss: true
    }),
  ],
  declarations: [
    PageNotFoundComponent,
    FileBase64InputComponent,
    ImgMapComponent,
  ],
  exports:[
    FileBase64InputComponent,
    FormsModule,
    MatButtonModule,
    ToastrModule,
    ImgMapComponent,
  ],
  providers: [
    HelperService,
    HttpService,
    FileService
  ]
  
})
export class SharedModule { }
