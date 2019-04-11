import { dump, load } from "js-yaml";
import { PropNode, INode } from "./PropNode";
import { Type } from "./Type";
import { IMap } from "./IMap";

export function dumpMore(more: any) {
  if (!more || Object.keys(more).length < 1) return "";
  try {
    return dump(more);
  } catch {
    return "";
  }
}

export function loadMore(more: string) {
  try {
    return load(more);
  } catch {
    return {};
  }
}

export function toSchema(node: INode) {
  const { type, title, description, children, more } = node;
  const descriptor: IMap = { type, title, description };
  if (type === Type.object && children && children.length > 0) {
    const properties: IMap = {};
    children.forEach(node => (properties[node.name] = toSchema(node)));
    descriptor.properties = properties;
  }
  if (type === Type.array && children && children[0]) {
    descriptor.items = toSchema(children[0]);
  }
  Object.assign(descriptor, loadMore(more));
  return descriptor;
}

export function fromSchema(descriptor: any, name?: string, isItems = false) {
  name = name || undefined;
  const { type, title, description, items, properties, ...more } = descriptor;
  const node = new PropNode({ name, type, title, description, isItems });
  if (type === Type.object && properties) {
    node.children = Object.keys(properties).map<INode>(name =>
      fromSchema(properties[name], name)
    );
  }
  if (type === Type.array && items) {
    node.children = [fromSchema(items, "items", true)];
  }
  node.more = dumpMore(more);
  return node;
}
