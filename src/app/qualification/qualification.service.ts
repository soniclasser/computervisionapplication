import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private http:HttpService) { }

  saveMetadata(data: any): Observable<any> {
    return this.http.post('/scaneadocumentos/guardamodificaciones',data)
  }

  getFileQualification(params:any): Observable<any> {
    return this.http.get(`/scaneadocumentos/busquedadocumentocalificacion?inicio=${params.fecha_inicio}&fin=${params.fecha_fin}&flag=${params.status}`)
  }

  getMetadata(id){
    return this.http.get(`/scaneadocumentos/DatosDocumento/?iddocumento=${id}`)
  }

}
