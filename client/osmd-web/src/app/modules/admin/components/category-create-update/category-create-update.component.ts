import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryService, MessageService, SpinnerService } from 'app/services';
import { Category } from 'app/shared';

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
              private messageService: MessageService,
              private spinnerService: SpinnerService,
              private location: Location) {
    this
      .createForm();
  }

  ngOnInit() {
    this.spinnerService.show();
    this.getCategoryIdFromRoute();
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
              this.location.back();
            }
          );
      } else {
        this.categoryForm.patchValue(this.currentCategory);
        this.fetched = true;
        this.spinnerService.hide();
      }
    });
  }

  save() {
    if (this.currentCategory._id) {
      this.categoryService.updateCategory(this.currentCategory._id, this.categoryForm.value).subscribe(
        () => {
          this.messageService.success('Категория успешно обновлена.', true);
          this.back();
        },
        (err) => console.log(err)
      );
    } else {
      this.categoryService.addCategory(this.categoryForm.value).subscribe(
        () => {
          this.messageService.success('Категория успешно создана.', true);
          this.back();
        },
        (err) => console.log(err)
      );
    }
  }

  back() {
    this.location.back();
  }

}
