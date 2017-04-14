import { Injectable, Inject } from '@angular/core';
import { RequestOptions, Response, URLSearchParams, Headers } from '@angular/http';

import { apiUrl } from 'app/config';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { User } from '../modules/admin/models';
import { Profile } from '../shared';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UserService {
  private apiUsersUrl: string;
  private apiUsersAdminUrl: string;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private authHttp: AuthHttp,
              @Inject(apiUrl) private apiUrl: string) {
    this.apiUsersUrl = `${apiUrl}/users`;
    this.apiUsersAdminUrl = `${apiUrl}/admin/users`;
  }

  getAllUsersForAdmin(skip: number, limit: number): Observable<{ users: User[], count: number }> {
    const searchParams = new URLSearchParams();
    searchParams.set('skip', skip.toString(10));
    searchParams.set('limit', limit.toString(10));

    const options = new RequestOptions({
      search: searchParams
    });

    return this.authHttp.get(this.apiUsersAdminUrl, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getUser(userId: string): Observable<User> {
    return this.authHttp.get(`${this.apiUsersUrl}/${userId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteUser(id): Observable<any> {
    return this.authHttp.delete(`${this.apiUsersUrl}/${id}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  getProfile(): Observable<Profile> {
    return this.authHttp.get(`${this.apiUsersUrl}/profile`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  sendConfirm(id: string): Observable<any> {
    return this.authHttp.post(`${this.apiUsersUrl}/send`, { _id: id })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  isAdmin(): Observable<boolean> {
    return this.authHttp.get(`${this.apiUsersUrl}/is-admin`)
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
