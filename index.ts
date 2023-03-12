import { readFileSync } from "fs";
import { buildQueryGraph } from "./utilities/query_builder";
import { QueryNode } from "./utilities/query_node";

const file = readFileSync(process.argv[2], "utf-8");

const query_str = file.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "");

var query = new QueryNode("");
buildQueryGraph(query_str, 0, query);
var res = query.execute();
console.log(JSON.stringify(res, null, 4));
