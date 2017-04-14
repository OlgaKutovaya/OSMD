import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { apiUrl } from '../config';
import { MessageService } from 'app/services';
import { Document } from 'app/shared';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class DocumentService {
  apiDocumentUrl: string;

  constructor(private http: Http,
              private messageService: MessageService,
              @Inject(apiUrl) private apiUrl: string) {
    this.apiDocumentUrl = `${this.apiUrl}/documents`;
  }

  getDocument(id): Observable<Document> {
    return this.http.get(`${this.apiDocumentUrl}/${id}`)
      .map((res: Response) => res.json())
      .catch(err => this.errorHandler(err));
  }

  getAllDocuments(): Observable<Document[]> {
    return this.http.get(`${this.apiDocumentUrl}`)
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
