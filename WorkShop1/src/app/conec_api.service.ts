import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  public getInfo () {
    return this.http.get('https://api.carbonintensity.org.uk/intensity/date')
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    // tslint:disable-next-line:no-console
    console.log(err.message);
    return Observable.throw(err.message);
  }
}