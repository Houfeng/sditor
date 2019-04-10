import { Type } from "./Type";
import * as shortid from "shortid";

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$"
);

export interface INode {
  id?: string;
  type?: Type;
  name?: string;
  title?: string;
  description?: string;
  children?: INode[];
  expanded?: boolean;
  isItems?: boolean;
  more?: string;
}

export class PropNode implements INode {
  id: string = "F" + shortid.generate();
  type: Type = Type.object;
  name = this.id;
  title = this.name;
  children: INode[] = [];
  expanded = false;
  description = "";
  more = "";

  public isType(type: Type) {
    return this.type === type;
  }

  constructor(opts?: INode) {
    if (opts) Object.assign(this, opts);
  }

  static canNodeHaveChildren = (node: INode) => {
    return node.type === Type.object || node.type === Type.array;
  };

  static canDrop = (opts: any) => {
    const nextParent: INode = opts.nextParent;
    return !nextParent || nextParent.type === Type.object;
  };

  static canDrag = (opts: any) => {
    const node: INode = opts.node;
    return node && !node.isItems;
  };

  static modelify(list: INode[]) {
    return list.map((item: INode) => {
      const node = item instanceof PropNode ? item : new PropNode(item);
      node.children = this.modelify(node.children);
      return node;
    });
  }

  static getNodeKey = ({ node }) => node.id;
}
