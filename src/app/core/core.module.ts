import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//services
import { HttpService } from '../core/http.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    HttpService
  ]
})
export class CoreModule { }
