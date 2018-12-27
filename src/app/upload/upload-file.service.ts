import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';
import { UploadFileModel } from '../core/models/upload-file.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http:HttpService) { }

  public uploadFile(data: UploadFileModel): Observable<any> {
    return this.http.post('/scaneadocumentos/cargadocumentos',data)
  }


  public getFileprocesing(data: UploadFileModel): Observable<any> {
    return this.http.get('/estatusprocesamiento?usuario=csuarez')
  }
}
