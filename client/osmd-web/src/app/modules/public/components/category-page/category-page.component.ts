import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'app/services';
import { Subcategory } from 'app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: [ './category-page.component.sass' ]
})
export class CategoryPageComponent implements OnInit {
  subcategory: Subcategory;
  categoryLabel: string;
  subcategoryLabel: string;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryLabel = params[ 'categoryLabel' ];
      this.subcategoryLabel = params[ 'subcategoryLabel' ];
      this.getCategory();
    });
  }

  getCategory() {
    if (this.categoryLabel && this.subcategoryLabel) {
      this.categoryService.getSubcategory(this.categoryLabel, this.subcategoryLabel)
        .subscribe(
          (subcategory) => {
            this.subcategory = subcategory;
          },
          (err) => {
            console.log(err);
            this.router.navigate([ '/' ]);
          }
        );
    }
  }

}
