import { INode, PropNode } from "./PropNode";
import { Mode } from "./Mode";

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
    return JSON.stringify(this.data, null, "  ");
  }

  setMode = (mode: Mode) => (this.mode = mode);
}
