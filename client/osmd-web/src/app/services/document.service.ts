import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { apiUrl } from '../config';
import { Document } from 'app/shared';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DocumentService {
  apiDocumentUrl: string;

  constructor(private http: Http,
              @Inject(apiUrl) private apiUrl: string) {
    this.apiDocumentUrl = `${this.apiUrl}/documents`;
  }

  getDocument(id): Observable<Document> {
    return this.http.get(`${this.apiDocumentUrl}/${id}`)
      .map((res: Response) => res.json());
  }

  getAllDocuments(): Observable<Document[]> {
    return this.http.get(`${this.apiDocumentUrl}`)
      .map((res: Response) => {
        return res.json();
      });
  }
}
