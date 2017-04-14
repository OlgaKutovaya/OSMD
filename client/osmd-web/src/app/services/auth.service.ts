import { Injectable, Inject } from '@angular/core';
import { RequestOptions, Http, Headers, Response } from '@angular/http';

import { tokenNotExpired, AuthConfig, AuthHttp } from 'angular2-jwt';
import { RegUser } from 'app/shared';
import { apiUrl } from 'app/config';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
  authToken: string;
  user: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http,
              @Inject(apiUrl) private apiUrl: string) {
    this.loadToken();
  }

  registration(user: RegUser): Observable<any> {
    console.log(user);
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(`${this.apiUrl}/users/registration`, user, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  login(email: string, password: string) {
    const data = { email, password };
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(`${this.apiUrl}/users/login`, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    this.authToken = null;
    this.user = null;
  }

  loadToken() {
    this.authToken = localStorage.getItem('jwt_token');
  }

  loggedIn() {
    return tokenNotExpired('jwt_token');
  }

  storeUserData(token, user): void {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  handleError(err: Response): Observable<any> {
    console.log(err);
    return Observable.throw(err.json());
  }

}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'jwt_token',
    globalHeaders: [ { 'Content-Type': 'application/json' } ],
    headerPrefix: 'JWT'
  }), http, options);
}

