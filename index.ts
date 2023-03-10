import { Query } from "./utilities/query";
import { Field } from "./utilities/field";

import { readFileSync } from "fs";

const file = readFileSync("./queries/component.ql", "utf-8");

const query_str = file.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "");
const query_regex = /[a-z_A-Z]+\([^\)]*\)(\.[^\)]*\))?/gi;
const query = buildQuery(query_str.split("{"));
query?.execute();

function buildQuery(query_builder: string[]) {
  var storage: string = query_builder[0];
  if (storage.match(query_regex)) {
    let storageName = storage.split("(")[0];

    let args: string[] = storage
      .split("(")[1]
      .replace(")", "")
      .replace(" ", "")
      .split(",");

    var query = new Query(storageName, args);
    var fields: Field[] = buildFields(
      query_builder.slice(1, query_builder.length)
    );

    for (var field of fields) {
      query.fields.push(field);
    }

    return query;
  }
}

function buildFields(fields_builder: string[]): Field[] {
  if (fields_builder.length < 1) return [];
  const res: Field[] = [];
  var fields = fields_builder[0].split(",");
  for (var i = 0; i < fields.length - 1; i++) {
    res.push(new Field(fields[i]));
  }

  var field = new Field(fields[fields.length - 1]);
  var nested_fields = buildFields(
    fields_builder.slice(1, fields_builder.length)
  );
  for (var nested of nested_fields) {
    field.nested.push(nested);
  }
  res.push(field);

  return res;
}
