import { Component, Input, OnInit } from '@angular/core';

import { Category, Subcategory } from 'app/shared';
import { CategoryService } from 'app/services';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.sass' ]
})
export class SidebarComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService,
              private router: Router) {
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

  onSubcategoryClick(category, subcategory) {
    console.log(this.router);
    this.router.navigate([ 'categories', category.label, subcategory.label ]);
  }

  findSelectedCategory(category: Category): boolean {
    return false;
  }
}
