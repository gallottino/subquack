import { storage_query } from "./substrate_storage";

const query_regex = /[a-z_A-Z]+\([^\)]*\)(\.[^\)]*\))?/gi;

export class QueryNode {
  query: string;
  args: string[];
  storage_name: string;

  nested: QueryNode[];

  constructor(value: string) {
    this.query = value;
    this.storage_name = "";
    this.nested = [];
    this.args = [];
    if (this.query.match(query_regex)) {
      let queryBuilder = this.query.split("(");
      this.storage_name = queryBuilder[0];

      this.args = queryBuilder[1]
        .replace(/(\r\n|\n|\r|\))/gm, "")
        .replace(/\s/g, "")
        .split(",");
    }
  }

  addNode(node: QueryNode) {
    this.nested.push(node);
  }

  public execute(data?: any): any {
    var res: any = {};

    if (this.query.match(query_regex)) {
      data = storage_query(this.storage_name, this.args);
    } else if (this.nested.length == 0) {
      return data[this.query];
    } else if (this.query != "" && data) {
      data = data[this.query];
    }

    for (var query of this.nested) {
      var sub_res = query.execute(data);
      var key = query.query;
      res[key] = sub_res;
    }

    return res;
  }

  print(n = -1) {
    var output = "";
    for (var i = 0; i < n; i++) {
      output += "  ";
    }
    output += this.query;
    if (output.length > 0) console.log(output);
    for (var query of this.nested) {
      query.print(n + 1);
    }
  }
}
