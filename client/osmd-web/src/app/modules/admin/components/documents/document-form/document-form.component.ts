import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { DocumentService, CategoryService, AuthService, ValidationService, MessageService } from 'app/services';
import { Document, SelectOptions } from 'app/shared';


@Component({
  selector: 'app-document-form',
  templateUrl: 'document-form.component.html',
  styleUrls: [ 'document-form.component.sass' ]
})
export class DocumentFormComponent implements OnInit {
  @Input() document: Document;
  categoryOptions: SelectOptions[] = [];
  documentForm: FormGroup;
  category: AbstractControl;


  constructor(public documentService: DocumentService,
              private categoryService: CategoryService,
              private messageService: MessageService,
              private authService: AuthService,
              private validationService: ValidationService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.documentForm = this.formBuilder.group({
      title: [ '', Validators.compose([
        Validators.required
      ]) ],
      label: [ '', Validators.compose([
        Validators.required
      ]) ],
      description: [ '', Validators.compose([
        Validators.required
      ]) ],
      category: [ '', Validators.compose([
        Validators.required
      ]) ],
      visible: [ true ],
      tags: [ [] ],
      price: [ 0, Validators.compose([
        Validators.required,
        this.validationService.priceValidator
      ]) ]
    });
    this.category = this.documentForm.controls[ 'category' ];
    this.documentForm.valueChanges.subscribe(() => {
      console.log(this.documentForm);
    });
  }

  ngOnInit() {

  }

  appendDataToUpload(event) {
    console.log(this.documentForm.value);
    const newDocument: Document = this.documentForm.value;
    for (const field in newDocument) {
      if (newDocument.hasOwnProperty(field)) {
        if (Array.isArray(newDocument[ field ])) {
          for (const item of newDocument[ field ]) {
            event.formData.append(field + '[]', item);
          }
        } else {
          event.formData.append(field, newDocument[ field ]);
        }
      }
    }
    event.xhr.setRequestHeader('Authorization', `JWT ${this.authService.authToken}`);
  }

  onCategoryChange(event) {
    console.log(event);
  }

  afterUpload(event) {
    this.messageService.success('Документ сохранен на сервере.');
  }

  onUploadError(event) {
    this.messageService.error(event.xhr.statusText);
  }

}
