import { INode } from "./PropNode";
import { Type } from "./Type";
import { load } from "js-yaml";

export interface IMap {
  [name: string]: any;
}

export function loadMore(more: string) {
  try {
    return load(more);
  } catch {
    return {};
  }
}

export class JsonNode {
  constructor(private node: INode) {}

  toJSON() {
    const { type, title, description, children, more } = this.node;
    const item: IMap = { type, title, description };
    if (type === Type.object && children && children.length > 0) {
      const properties: IMap = {};
      children.forEach(node => (properties[node.name] = new JsonNode(node)));
      item.properties = properties;
    }
    if (type === Type.array && children && children[0]) {
      item.items = new JsonNode(children[0]);
    }
    Object.assign(item, loadMore(more));
    return item;
  }
}
