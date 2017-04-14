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
          this.categories = categories;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onRowSelect(event) {
    console.log(event);
  }

  addCategory() {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  editCategory(category) {
    this.router.navigate([ 'edit', category._id ], { relativeTo: this.route });
  }

}
