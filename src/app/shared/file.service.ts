import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpService) { }

  getFilesToBase64(IdDocument): Observable<any>{
    return this.http.get(`/scaneadocumentos/busquedadocumentoimagen?iddocumento=${IdDocument}`)
  }
}
