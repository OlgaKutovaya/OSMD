import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryService, MessageService } from 'app/services';
import { Category } from 'app/shared';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-category-create-update',
  templateUrl: './category-create-update.component.html',
  styleUrls: [ './category-create-update.component.sass' ]
})
export class CategoryCreateUpdateComponent implements OnInit {
  @Input() category: Category;
  @Output() onCategoryEdit: EventEmitter<Category> = new EventEmitter();

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    this.createForm();
  }

  ngOnInit() {
    if (this.category) {
      this.categoryForm.patchValue(this.category);
    } else {
      this.category = new Category({
        name: '',
        label: '',
        order: 0,
        visible: true
      });
    }
  }

  createForm() {
    this.categoryForm = this.formBuilder.group({
      name: [ '', Validators.compose([
        Validators.required
      ]) ],
      label: [ '', Validators.compose([
        Validators.required
      ]) ],
      visible: [ true, Validators.required ],
      order: [ 0, Validators.compose([
        Validators.required
      ]) ]
    });
  }

  saveCategory() {
    if (this.category._id) {
      this.categoryService.updateCategory(this.category._id, this.categoryForm.value).subscribe(
        (category) => {
          this.messageService.success('Категория успешно обновлена.');
          this.backToCategories(category);
        },
        (err) => console.log(err)
      );
    } else {
      this.categoryService.addCategory(this.categoryForm.value).subscribe(
        (category) => {
          this.messageService.success('Категория успешно добавлена.');
          this.backToCategories(category);
        },
        (err) => console.log(err)
      );
    }
  }

  backToCategories(category: Category) {
    this.onCategoryEdit.emit(category);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Удалить данную категорию?',
      icon: 'fa fa-question-circle',
      header: 'Удаление категории',
      key: 'confirm',
      accept: () => {
        this.deleteCategory();
      }
    });
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category._id)
      .subscribe(
        (category) => {
          this.messageService.success('Категория успешно удалена.');
          this.backToCategories(category);
        },
        (err) => {
          console.log(err);
          // this.backToCategories(null);
        }
      );
  }

}
