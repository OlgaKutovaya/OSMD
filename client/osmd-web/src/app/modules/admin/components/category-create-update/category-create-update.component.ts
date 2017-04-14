import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryService, MessageService, SpinnerService } from 'app/services';
import { Category } from 'app/shared';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-category-create-update',
  templateUrl: './category-create-update.component.html',
  styleUrls: [ './category-create-update.component.sass' ]
})
export class CategoryCreateUpdateComponent implements OnInit {

  currentCategory = new Category({
    name: '',
    label: '',
    description: '',
    order: 0,
    parent: null,
    visible: true,
  });

  categoryForm: FormGroup;
  fetched = false;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private spinnerService: SpinnerService,
              private router: Router) {
    this
      .createForm();
  }

  ngOnInit() {
    this.spinnerService.show();
    this.getCategoryIdFromRoute();
  }

  getTitle() {
    if (this.currentCategory && this.currentCategory._id) {
      return `Изменение категории "${this.currentCategory.name}"`;
    }
    return 'Добавление новой категории';
  }

  createForm() {
    this.categoryForm = this.formBuilder.group({
      name: [ '', Validators.compose([
        Validators.required
      ]) ],
      label: [ '', Validators.compose([
        Validators.required
      ]) ],
      description: [ '', Validators.compose([
        Validators.required
      ]) ],
      visible: [ true, Validators.required ],
      parent: [ null ],
      order: [ 0, Validators.compose([
        Validators.required
      ]) ]
    });
  }

  getCategoryIdFromRoute() {
    this.route.params.subscribe(params => {
      const id = params[ 'id' ];
      if (id) {
        this.categoryService.getCategoryForAdmin(id)
          .subscribe(
            (category) => {
              this.currentCategory = category;
              this.categoryForm.patchValue(this.currentCategory);
              this.fetched = true;
              this.spinnerService.hide();
            },
            (err) => {
              console.log(err);
              this.spinnerService.hide();
              this.backToCategories();
            }
          );
      } else {
        this.categoryForm.patchValue(this.currentCategory);
        this.fetched = true;
        this.spinnerService.hide();
      }
    });
  }

  saveCategory() {
    if (this.currentCategory._id) {
      this.categoryService.updateCategory(this.currentCategory._id, this.categoryForm.value).subscribe(
        () => {
          this.messageService.success('Категория успешно обновлена.', true);
          this.backToCategories();
        },
        (err) => console.log(err)
      );
    } else {
      this.categoryService.addCategory(this.categoryForm.value).subscribe(
        () => {
          this.messageService.success('Категория успешно добавлена.', true);
          this.backToCategories();
        },
        (err) => console.log(err)
      );
    }
  }

  backToCategories() {
    this.router.navigate([ 'admin/categories' ]);
  }

  confirmDelete() {
    if (this.currentCategory._id) {
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
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.currentCategory._id)
      .subscribe(
        (category) => {
          console.log(category);
          this.messageService.success('Категория успешно удалена.', true);
          this.backToCategories();
        },
        (err) => {
          console.log(err);
          this.backToCategories();
        }
      );
  }

}
