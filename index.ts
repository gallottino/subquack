import { Query } from "./utilities/query";
import { Field } from "./utilities/field";

import { readFileSync } from "fs";
import { buildQuery } from "./utilities/query_builder";

const file = readFileSync("./queries/component.ql", "utf-8");

const query_str = file.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "");

const query = buildQuery(query_str.split("{"));
query?.execute();
