import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from 'app/shared';
import { CategoryService } from 'app/services';

export interface ICategoryTableColumns {
  field: string;
  header: string;
}

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: [ './categories-table.component.sass' ]
})
export class CategoriesTableComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category;
  columns: ICategoryTableColumns[ ] = [
    {
      field: 'name',
      header: 'Название'
    }
  ];

  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.categoryService.getCategoriesForAdmin()
      .subscribe(
        (categories) => {
          // this.categories = categories;
          this.formatNestedCategories(categories);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  formatNestedCategories(categories: Category[]) {
    const result = [];
    for (const category of categories) {
      if (!category.parent) {
        result.push(category);
        if (category.children && category.children.length) {
          category.children.forEach(child => {
            result.push(child);
          });
        }
      }
    }
    this.categories = result;
  }

  onRowSelect() {
  }

  addCategory() {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  editCategory(category) {
    this.router.navigate([ 'edit', category._id ], { relativeTo: this.route });
  }

}
