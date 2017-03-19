import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';

import { apiUrl } from 'app/config';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttp,
              @Inject(apiUrl) private apiUrl: string) {
  }

  getAll(): Observable<any> {
    return this.authHttp.get(`${this.apiUrl}/users`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getProfile(): Observable<any> {
    return this.authHttp.get(`${this.apiUrl}/users/profile`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  sendConfirm(id: string): Observable<any> {
    return this.authHttp.post(`${this.apiUrl}/users/send`, { _id: id })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  handleError(err: Response): Observable<any> {
    console.log(err);
    return Observable.throw(err.json());
  }

}
