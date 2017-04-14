import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { apiUrl } from '../config/config';
import { Category, SelectOptions } from 'app/shared';
import { MessageService } from 'app/services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CategoryService {
  private apiCategoryUrl;
  private apiCategoryAdminUrl;

  constructor(private http: Http,
              private authHttp: AuthHttp,
              private messageService: MessageService,
              @Inject(apiUrl) private apiUrl: string) {
    this.apiCategoryUrl = `${this.apiUrl}/categories`;
    this.apiCategoryAdminUrl = `${this.apiUrl}/admin/categories`;
  }

  getCategories(): Observable<Category[]> {
    return this.http.get(`${this.apiCategoryUrl}`)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  getCategoriesTree(): Observable<Category[]> {
    return this.http.get(`${this.apiCategoryUrl}/tree`)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get(`${this.apiCategoryUrl}/${id}`)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }


  // ADMIN
  getCategoriesForAdmin(): Observable<Category[]> {
    return this.authHttp.get(this.apiCategoryAdminUrl)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  getCategoryForAdmin(id: string): Observable<Category> {
    return this.authHttp.get(`${this.apiCategoryAdminUrl}/${id}`)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  getCategoryOptionsForAdmin(): Observable<SelectOptions[]> {
    return this.authHttp.get(this.apiCategoryAdminUrl)
      .map((res: Response) => res.json() as Category[])
      .map(categories => {
        const options = [];
        for (const category of categories) {
          if (!category.parent) {
            options.push({
              label: category.name,
              value: category._id
            });
          }
        }
        for (const category of categories) {
          if (category.parent) {
            const index = options.findIndex(opt => opt.value === category.parent);
            if (index > -1) {
              options.splice(index + 1, 0, { label: ' - ' + category.name, value: category._id });
            }
          }
        }
        return options;
      })
      .catch(err => this.errorHandler(err));
  }

  updateCategory(id: string, updatedCategory: Category): Observable<Category> {
    return this.authHttp.put(`${this.apiCategoryAdminUrl}/${id}`, updatedCategory)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  addCategory(newCategory: Category): Observable<Category> {
    return this.authHttp.post(`${this.apiCategoryAdminUrl}`, newCategory)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  deleteCategory(id: string): Observable<Category> {
    return this.authHttp.delete(`${this.apiCategoryAdminUrl}/${id}`)
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
