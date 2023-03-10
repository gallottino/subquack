import { Field } from "./field";

const component = {
  "0x01000000": {
    owner: "Davide Gallotti",
    max_borrows: 0,
    max_children: 0,
    properties: {
      type: "Bachelor",
      university: "Politecnico di Torino",
      vote: 110,
      date: "23/03/2018",
    },
  },
  "0x02000000": {
    owner: "Davide Gallotti",
    max_borrows: 0,
    max_children: 0,
    properties: {
      exam: "Computational Geometry",
      vote: 27,
      university: "Politecnico di Torino",
    },
  },
  "0x03000000": {
    max_borrows: 0,
    max_children: 0,
    owner: "Davide Gallotti",
    properties: {
      exam: "Mathematical Analysis",
      vote: 23,
      university: "Politecnico di Torino",
    },
  },
};

const outgoings = {
  "0x01000000": {
    passed_0: "0x02000000",
    passed_1: "0x03000000",
  },
};

export class Query {
  storage_name: string;
  args: string[];
  fields: Field[];
  nested: Query[];

  constructor(storage_name: string, args: string[]) {
    this.storage_name = storage_name;
    this.args = args;
    this.fields = [];
    this.nested = [];
  }

  addField(field: Field) {
    this.fields.push(field);
  }

  addQuery(query: Query) {
    this.nested.push(query);
  }

  execute() {
    var res: any = {};
    var data = this.query();
    for (var field of this.fields) {
      res[field.key] = field.get(data);
    }

    console.log(JSON.stringify(res, null, 2));
    return res;
  }

  query() {
    switch (this.storage_name) {
      case "component": {
        return component[this.args[0] as keyof typeof component];
      }
      case "outgoings": {
        return outgoings[this.args[0] as keyof typeof outgoings];
      }
      default: {
        return {};
      }
    }
  }
}
