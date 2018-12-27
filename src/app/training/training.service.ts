import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public user ={
    name:'csuarez'
  }

  constructor(private http:HttpService) { }

  saveCoordinates(data: any): Observable<any> {
    return this.http.post('/scaneadocumentos/insertaCoordenadasImg',data)
  }

  getFileFinished(params:any): Observable<any> {
    return this.http.get(`/scaneadocumentos/estatusprocesamiento?usuario=${this.user.name}&Estatus=${params.status}`)
  }

}
