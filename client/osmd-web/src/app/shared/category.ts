import { IDocument } from './document';

export interface ICategory {
  _id?: string;
  label: string;
  name: string;
  description: string;
  picture?: string;
  visible: boolean;
  order: number;
  parent?: string;
  children?: ICategory[];
  documents?: IDocument[];

}

export class Category implements ICategory {
  _id: string;
  label: string;
  name: string;
  description: string;
  picture: string;
  visible: boolean;
  order: number;
  parent: string;
  children: ICategory[];
  documents: IDocument[];

  constructor(category?: ICategory) {
    this.label = category.label;
    this.name = category.name;
    this.description = category.description;
    this.picture = category.description;
    this.visible = category.visible;
    this.order = category.order;
    this.parent = category.parent;
    this.children = category.children;
    this.documents = category.documents;
  }
}

