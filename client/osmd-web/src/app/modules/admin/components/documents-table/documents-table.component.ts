import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Document } from 'app/shared';
import { LazyLoadEvent } from 'primeng/primeng';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-documents-table',
  templateUrl: 'documents-table.component.html',
  styleUrls: [ 'documents-table.component.sass' ]
})
export class DocumentsTableComponent {
  documents: Document[];
  totalRecords: number;
  paginationSkip: number;
  paginationLimit: number;
  creatingNewDocument: boolean;
  displayDialog: boolean;
  selectedDocument: Document;
  columns: any[] = [
    { field: 'title', header: 'Название' },
    { field: 'category', header: 'Категория' },
    { field: 'price', header: 'Цена' }
  ];

    constructor(private spinnerService: SpinnerService) {

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
    this.spinnerService.hide();
  }

  showCreationDialog() {
    this.creatingNewDocument = true;
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.creatingNewDocument = false;
    this.displayDialog = true;
  }

  onCategoryChange(event) {
  }


  onResetForm(event) {
    console.log(event);
  }
}
