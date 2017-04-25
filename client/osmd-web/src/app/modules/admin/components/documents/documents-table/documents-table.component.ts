import { Component, OnInit } from '@angular/core';

import { Document } from 'app/shared';
import { LazyLoadEvent } from 'primeng/primeng';
import { SpinnerService, DocumentService } from 'app/services';

@Component({
  selector: 'app-documents-table',
  templateUrl: 'documents-table.component.html',
  styleUrls: [ 'documents-table.component.sass' ]
})
export class DocumentsTableComponent implements OnInit {
  documents: Document[];
  displayDialog = false;
  dialogHeader: string;
  totalRecords: number;
  paginationSkip: number;
  paginationLimit: number;
  currentDocument: Document;

  columns: any[] = [
    { field: 'title', header: 'Название' },
    { field: 'category', header: 'Категория' },
    { field: 'subcategory', header: 'Подкатегория' },
    { field: 'filename', header: 'Имя файла' },
    { field: 'price', header: 'Цена' }
  ];

  constructor(private spinnerService: SpinnerService,
              private documentService: DocumentService) {

  }

  ngOnInit() {

  }

  loadDocumentsLazy(event: LazyLoadEvent) {
    this.paginationSkip = event.first;
    this.paginationLimit = event.rows;
    this.spinnerService.show();
    this.getDocumentsWithPagination(this.paginationSkip, this.paginationLimit);
  }

  getDocumentsWithPagination(skip: number, limit: number) {
    this.documents = [];
    this.totalRecords = this.documents.length;
    this.documentService.getDocumentsWithPagination(skip, limit)
      .subscribe(
        (res) => {
          this.spinnerService.hide();
          this.documents = res.documents;
          this.totalRecords = res.count;
        },
        (err) => {
          this.spinnerService.hide();
          console.log(err);
        }
      );
  }

  createUpdateDocument(document: Document) {
    if (document) {
      this.dialogHeader = 'Редактирование документа';
    } else {
      this.dialogHeader = 'Добавление документа';
    }
    this.displayDialog = true;
  }

  onRowSelect() {
  }

  resetCurrentDocument() {
    this.displayDialog = false;
    this.currentDocument = null;
  }

}
