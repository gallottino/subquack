import { QueryNode } from "./query_node";

export function buildQueryGraph(
  queryStr: string,
  n: number,
  node?: QueryNode
): number {
  var body = "";

  while (n < queryStr.length) {
    var c = queryStr.charAt(n);
    n++;
    switch (c) {
      case "{":
        var newNode = new QueryNode(body);
        n = buildQueryGraph(queryStr, n, newNode);
        node?.addNode(newNode);
        body = "";
        break;
      case ",":
        node?.addNode(new QueryNode(body));
        body = "";
        break;
      case "}":
        if (body.length > 0) {
          node?.addNode(new QueryNode(body));
          body = "";
        }
        return n + 1;
      default:
        body += c;
        break;
    }
  }
  return n;
}
