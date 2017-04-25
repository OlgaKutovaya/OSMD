import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SubcategoryService, MessageService } from 'app/services';
import { Subcategory } from 'app/shared';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-subcategory-create-update',
  templateUrl: './subcategory-create-update.component.html',
  styleUrls: [ './subcategory-create-update.component.sass' ]
})
export class SubcategoryCreateUpdateComponent implements OnInit {
  @Input() subcategory: Subcategory;
  @Input() categoryId: string;
  @Output() onSubcategoryEdit: EventEmitter<Subcategory> = new EventEmitter();

  subcategoryForm: FormGroup;

  constructor(private subcategoryService: SubcategoryService,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    this.createForm();
  }

  ngOnInit() {
    if (this.subcategory) {
      this.subcategoryForm.patchValue(this.subcategory);
    } else {
      this.subcategory = new Subcategory({
        name: '',
        label: '',
        order: 0,
        visible: true,
        category: this.categoryId,
        description: ''
      });
      this.subcategoryForm.patchValue(this.subcategory);
    }
  }

  createForm() {
    this.subcategoryForm = this.formBuilder.group({
      name: [ '', Validators.compose([
        Validators.required
      ]) ],
      label: [ '', Validators.compose([
        Validators.required
      ]) ],
      description: [ '', Validators.compose([
        Validators.required
      ]) ],
      category: [ this.categoryId, Validators.required ],
      visible: [ true, Validators.required ],
      order: [ 0, Validators.compose([
        Validators.required
      ]) ]
    });
  }

  saveSubcategory() {
    if (this.subcategory._id) {
      this.subcategoryService.updateSubcategory(this.subcategory._id, this.subcategoryForm.value).subscribe(
        (subcategory) => {
          this.messageService.success('Подкатегория успешно обновлена.');
          this.backToCategories(subcategory);
        },
        (err) => console.log(err)
      );
    } else {
      this.subcategoryService.addSubcategory(this.subcategoryForm.value).subscribe(
        (subcategory) => {
          this.messageService.success('Подкатегория успешно добавлена.');
          this.backToCategories(subcategory);
        },
        (err) => console.log(err)
      );
    }
  }

  backToCategories(subcategory: Subcategory) {
    this.onSubcategoryEdit.emit(subcategory);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Удалить данную подкатегорию?',
      icon: 'fa fa-question-circle',
      header: 'Удаление подкатегории',
      key: 'confirm',
      accept: () => {
        this.deleteSubcategory();
      }
    });
  }

  deleteSubcategory() {
    this.subcategoryService.deleteSubcategory(this.subcategory._id)
      .subscribe(
        (subcategory) => {
          this.messageService.success('Категория успешно удалена.');
          this.backToCategories(subcategory);
        },
        (err) => {
          console.log(err);
          // this.backToCategories(null);
        }
      );
  }

}
