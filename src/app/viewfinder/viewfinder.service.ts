import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ViewfinderService {


  constructor(private http:HttpService) { }

  public getDataForShow(id_documento): Observable<any> {
    return this.http.get(`/scaneadocumentos/visualizaDatos?idDocumento=${id_documento}`)
  }
}
