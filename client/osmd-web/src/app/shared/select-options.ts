export interface ISelectOptions {
  label: string;
  value: string;
}

export class SelectOptions implements ISelectOptions {
  constructor(public label: string,
              public value: string) {
  }
}

