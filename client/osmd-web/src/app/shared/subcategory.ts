import { IDocument } from './document';

export interface ISubcategory {
  _id?: string;
  label: string;
  name: string;
  description: string;
  picture?: string;
  visible: boolean;
  order: number;
  category: string;
  documents?: IDocument[];
}

export class Subcategory implements ISubcategory {
  _id: string;
  label: string;
  name: string;
  description: string;
  picture: string;
  visible: boolean;
  order: number;
  category: string;
  documents: IDocument[];

  constructor(subcategory?: ISubcategory) {
    this.label = subcategory.label;
    this.name = subcategory.name;
    this.description = subcategory.description;
    this.picture = subcategory.description;
    this.visible = subcategory.visible;
    this.order = subcategory.order;
    this.category = subcategory.category;
  }
}

