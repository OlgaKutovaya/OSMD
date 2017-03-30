import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';

import { apiUrl } from 'app/config';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { User } from '../modules/admin/models';
import { Profile } from '../shared';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttp,
              @Inject(apiUrl) private apiUrl: string) {
  }

  getAllUsers(skip: number, limit: number): Observable<{ users: User[], count: number }> {
    const query = [
      `skip=${skip}`,
      `limit=${limit}`
    ].join('&');

    return this.authHttp.get(`${this.apiUrl}/users?${query}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getUser(userId: string): Observable<User> {
    return this.authHttp.get(`${this.apiUrl}/users/${userId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteUser(id): Observable<any> {
    return this.authHttp.delete(`${this.apiUrl}/users/${id}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  getProfile(): Observable<Profile> {
    return this.authHttp.get(`${this.apiUrl}/users/profile`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  sendConfirm(id: string): Observable<any> {
    return this.authHttp.post(`${this.apiUrl}/users/send`, { _id: id })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  isAdmin(): Observable<boolean> {
    return this.authHttp.get(`${this.apiUrl}/users/is-admin`)
      .map((res: Response) => res.json().isAdmin);
  }

  handleError(err: Response): Observable<any> {
    console.log(err);
    const error = err.json();
    if (error.message) {
      return Observable.throw(error.message);
    }
    return Observable.throw(err.json());
  }

}
