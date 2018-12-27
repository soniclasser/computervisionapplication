import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ViewfinderService {


  constructor(private http:HttpService) { }

  public uploadFile(data): Observable<any> {
    return this.http.get(`?IdDocumento=${data.idDocuemtno}`)
  }
}
