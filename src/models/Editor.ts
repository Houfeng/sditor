import { INode, PropNode } from "./PropNode";
import { Mode } from "./Mode";
import { removeNodeAtPath } from "react-sortable-tree";
import { Type } from "./Type";
import { JsonNode } from "./JsonNode";

export class EditorModel {
  mode: Mode = Mode.design;
  data: INode[] = [];

  current: INode = null;

  setCurrent = (node: INode) => {
    this.current = node;
  };

  add = () => {
    const newNode = new PropNode();
    this.data = PropNode.modelify([...this.data, newNode]);
    this.current = newNode;
  };

  remove = (path: string[]) => {
    const treeData = this.data,
      getNodeKey = PropNode.getNodeKey;
    const result = removeNodeAtPath({ treeData, path, getNodeKey });
    this.data = PropNode.modelify([...result]);
  };

  addToParent = (parent: INode) => {
    const newNode = new PropNode();
    parent.children = [...parent.children, newNode];
    parent.expanded = true;
    this.data = PropNode.modelify([...this.data]);
    this.current = newNode;
  };

  setData = data => {
    this.data = PropNode.modelify(data);
  };

  get source() {
    const root = new PropNode({
      type: Type.object,
      children: this.data,
      title: undefined,
      description: undefined
    });
    return JSON.stringify(new JsonNode(root), null, "  ");
  }

  get schema() {
    return JSON.parse(this.source);
  }

  setMode = (mode: Mode) => (this.mode = mode);
}
