export interface IDocument {
  _id?: string;
  label: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  visible: boolean;
  price: number;
}

export class Document implements IDocument {
  _id: string;
  label: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  visible: boolean;
  price: number;

  constructor(doc?: IDocument) {
    this.label = doc.label;
    this.title = doc.title;
    this.description = doc.description;
    this.category = doc.category;
    this.tags = doc.tags;
    this.visible = doc.visible;
    this.price = doc.price;
  }
}
