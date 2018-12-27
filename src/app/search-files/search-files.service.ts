import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SearchFilesService {

  constructor(private http:HttpService) { }

  searchFilesByTextOrQualification(params:any): Observable<any> {
    return this.http.get(`/scaneadocumentos/busquedadocumento?flag=${params.type_search}&palabra=${params.text}`)
  }

  getQualificacionList(){
    return this.http.get(`/scaneadocumentos/obtienecalificadores`)
  }
}
