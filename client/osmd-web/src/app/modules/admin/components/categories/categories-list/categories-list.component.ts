import { Component, OnInit } from '@angular/core';

import { Category, Subcategory } from 'app/shared';
import { CategoryService } from 'app/services';


@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-list.component.html',
  styleUrls: [ './categories-list.component.sass' ]
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  displayDialog = false;
  currentCategory: Category = null;
  currentSubcategory: Subcategory = null;
  action: string;
  dialogHeader: string;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(
        (categories) => {
          this.categories = categories;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  resetCurrentCategories() {
    this.displayDialog = false;
    this.action = '';
    this.currentCategory = null;
    this.currentSubcategory = null;
  }

  createUpdateCategory(category) {
    this.resetCurrentCategories();
    if (category) {
      this.currentCategory = category;
      this.dialogHeader = 'Редактирование категории';
    } else {
      this.dialogHeader = 'Добавление категории';
    }
    this.action = 'createUpdateCategory';
    this.displayDialog = true;
  }


  createUpdateSubcategory(category: Category, subcategory?: Subcategory) {
    this.resetCurrentCategories();
    this.currentCategory = category;
    if (subcategory) {
      this.dialogHeader = 'Редактирование подкатегории';
      this.currentSubcategory = subcategory;
    } else {
      this.dialogHeader = 'Добавление подкатегории';
    }
    this.action = 'createUpdateSubcategory';
    this.displayDialog = true;
  }

  onCategoryEdited(category: Category) {
    this.resetCurrentCategories();
    if (category) {
      this.ngOnInit();
    }
  }

  onSubcategoryEdited(subcategory: Subcategory) {
    this.resetCurrentCategories();
    if (subcategory) {
      this.ngOnInit();
    }
  }
}
