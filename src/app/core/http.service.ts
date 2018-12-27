import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {environment} from './../../environments/environment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private base = 'http://localhost/';

  constructor(private http: Http) {
    if (environment) {
        this.base = environment.url;
    }
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.intercept(this.http.get(this.base + url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.intercept(this.http.post(this.base + url, body, this.getRequestOptionArgs(options)));
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
        options.headers = new Headers();
    }

    options.headers.append('Content-Type', 'application/json');

    return options;
  }

  private intercept(observable: Observable<Response>): Observable<Response> {
    return observable
        .map(res => res.json())
        .catch((error, source) => {
            let response = {};
            try {
                response = {
                  status: error.status,
                  message: error.statusText,
                }
            } catch (error) {
              console.log(error);
                response = {
                    code: -1,
                    message: error.statusText ? (error.status + ': ' + error.statusText) : 'No hay información adicional del error. (Status ' + error.status + ')'
                };
            }
            return Observable.throw(response);
        })
}
}
