import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../shared/user/user';
import { Observable } from 'rxjs';
import { apiUrl } from '../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(@Inject(apiUrl) private apiUrl: string,
              private http: Http) {
  }

  registration(user: User): Observable<any> {
    console.log(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return this.http.post(`${this.apiUrl}/users/registration`, user, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  login(email: string, password: string) {
    const data = { email, password };
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return this.http.post(`${this.apiUrl}/users/login`, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getAll(): Observable<any> {
    return this.http.get('', {});
  }

  handleError(err: Response): Observable<any> {
    console.log(err);

    return Observable.throw(err.json() || 'Error');
  }

}
