import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';
import { UploadFileModel } from '../core/models/upload-file.model';

@Injectable({
  providedIn: 'root'
})
export class MailboxService {

  public user ={
    name:'csuarez'
  }

  constructor(private http:HttpService) { }

  public getFileprocesing(data:any): Observable<any> {
    //cambiar esta funcion cuando existan filtros
    return this.http.get(`/scaneadocumentos/estatusprocesamiento?usuario=${this.user.name}`)
  }

}
