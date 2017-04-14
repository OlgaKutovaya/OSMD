import { Component, OnInit } from '@angular/core';

import { Category } from 'app/shared';
import { CategoryService } from 'app/services';
import { Router } from '@angular/router';


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
    this.categoryService.getCategoriesTree()
      .subscribe(
        (categories) => {
          this.categories = categories;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCategoryClick(category) {
    this.router.navigate([ 'category', category._id ]);
  }

  onRootCategoryClick(event) {
    const index = event.index;
    this.router.navigate([ 'category', this.categories[ index ]._id ]);
  }
}
