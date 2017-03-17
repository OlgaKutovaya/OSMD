import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../shared/user/user';
import { Observable } from 'rxjs';
import { apiUrl } from '../config/config';
import 'rxjs/add/operator/map';
import { AuthService } from 'app/services/auth.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {

  constructor(@Inject(apiUrl) private apiUrl: string,
              private http: Http,
              private authHttp: AuthHttp,
              private authService: AuthService) {
  }

  getAll(): Observable<any> {
    return this.http.get('', {});
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
