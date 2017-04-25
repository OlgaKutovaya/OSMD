import { Subcategory } from './subcategory';

export interface ICategory {
  _id?: string;
  label: string;
  name: string;
  visible: boolean;
  order: number;
  subcategories?: Subcategory[];
}

export class Category implements ICategory {
  _id: string;
  label: string;
  name: string;
  visible: boolean;
  order: number;
  subcategories: Subcategory[];

  constructor(category?: ICategory) {
    this.label = category.label;
    this.name = category.name;
    this.visible = category.visible;
    this.order = category.order;
  }
}

