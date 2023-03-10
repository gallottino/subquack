export class Field {
  key: string;
  nested: Field[];

  constructor(name: string) {
    this.key = name.replace("}", "").replace("}", "");
    this.nested = [];
  }

  get(data: any) {
    var res: any = {};
    if (this.nested.length > 0) {
      for (var field of this.nested) {
        res[field.key] = field.get(data[this.key]);
      }
    } else {
      return data[this.key];
    }

    return res;
  }
}
