import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'app/services';
import { Category } from 'app/shared';
import { ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.map(params => {
      this.categoryId = params[ 'id' ];
      return this.categoryId;
    }).switchMap((id) => {
      return this.categoryService.getCategory(id);
    }).subscribe(
      (category) => {
        this.category = category;
      },
      (err) => console.log(err)
    );
  }

}
