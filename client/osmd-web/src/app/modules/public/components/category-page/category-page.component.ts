import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'app/services';
import { Category } from 'app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: [ './category-page.component.sass' ]
})
export class CategoryPageComponent implements OnInit {
  category: Category;
  categoryId: string;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params[ 'id' ];
      this.getCategory();
    });
  }

  getCategory() {
    if (this.categoryId) {
      this.categoryService.getCategory(this.categoryId)
        .subscribe(
          (category) => {
            this.category = category;
          },
          (err) => {
            console.log(err);
            this.router.navigate([ '/' ]);
          }
        );
    }
  }

}
