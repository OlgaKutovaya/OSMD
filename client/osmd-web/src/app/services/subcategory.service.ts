import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { apiUrl } from '../config/config';
import { Subcategory } from 'app/shared';
import { MessageService } from 'app/services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SubcategoryService {
  private apiSubcategoryAdminUrl;

  constructor(private authHttp: AuthHttp,
              private messageService: MessageService,
              @Inject(apiUrl) private apiUrl: string) {
    this.apiSubcategoryAdminUrl = `${this.apiUrl}/admin/subcategories`;
  }

  updateSubcategory(id: string, updatedSubcategory: Subcategory): Observable<Subcategory> {
    return this.authHttp.put(`${this.apiSubcategoryAdminUrl}/${id}`, updatedSubcategory)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  addSubcategory(newSubcategory: Subcategory): Observable<Subcategory> {
    return this.authHttp.post(`${this.apiSubcategoryAdminUrl}`, newSubcategory)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  deleteSubcategory(id: string): Observable<Subcategory> {
    return this.authHttp.delete(`${this.apiSubcategoryAdminUrl}/${id}`)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  errorHandler(err): Observable<any> {
    console.log(err);
    let errorMessage;
    if (err instanceof Response) {
      const body = err.json() || '';
      const error = body.message || JSON.stringify(body);
      if (err.status > 0) {
        errorMessage = `${err.status} - ${error}`;
      } else {
        errorMessage = 'Ошибка. Возможно сервер временно не работает.';
      }
    } else {
      errorMessage = err.message || err.toString();
    }
    this.messageService.error(errorMessage, true, 8000);
    return Observable.throw(errorMessage);
  }
}
