import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { apiUrl } from '../config/config';
import { Category, SelectOptions } from 'app/shared';
import { MessageService } from 'app/services/message.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  private apiCategoryUrl;
  private apiCategoryAdminUrl;

  constructor(private http: Http,
              private messageService: MessageService,
              private authHttp: AuthHttp,
              @Inject(apiUrl) private apiUrl: string) {
    this.apiCategoryUrl = `${this.apiUrl}/categories`;
    this.apiCategoryAdminUrl = `${this.apiUrl}/admin/categories`;
  }

  getCategories(): Observable<Category[]> {
    return this.http.get(`${this.apiCategoryUrl}`)
      .map((res: Response) => res.json());
  }

  getCategoriesTree(): Observable<Category[]> {
    return this.http.get(`${this.apiCategoryUrl}/tree`)
      .map((res: Response) => res.json());
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get(`${this.apiCategoryUrl}/${id}`)
      .map((res: Response) => res.json());
  }


  // ADMIN
  getCategoriesForAdmin(): Observable<Category[]> {
    return this.authHttp.get(this.apiCategoryAdminUrl)
      .map((res: Response) => res.json());
  }

  getCategoryForAdmin(id: string): Observable<Category> {
    return this.authHttp.get(`${this.apiCategoryAdminUrl}/${id}`)
      .map((res: Response) => res.json());
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
      });
  }

  updateCategory(id: string, updatedCategory: Category): Observable<any> {
    return this.authHttp.put(`${this.apiCategoryAdminUrl}/${id}`, updatedCategory)
      .map((res: Response) => res.json());
  }

  addCategory(newCategory: Category): Observable<Category> {
    return this.authHttp.post(`${this.apiCategoryAdminUrl}`, newCategory)
      .map((res: Response) => res.json());
  }
}
