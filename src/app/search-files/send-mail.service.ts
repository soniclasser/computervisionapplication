import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs/Observable';
import { SendMailModel } from '../core/models/send-mail.model';


@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http:HttpService) { }


  sendMail(data:SendMailModel): Observable<any>{
    return this.http.post('/scaneadocumentos/enviacorreo',data)
  }
}
