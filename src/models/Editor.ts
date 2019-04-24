import { INode, PropNode } from "./PropNode";
import { Mode } from "./Mode";
import { removeNodeAtPath } from "react-sortable-tree";
import { Type } from "./Type";
import { toSchema, fromSchema } from "./Converter";
import { Display } from "./Display";

export class EditorModel {
  mode: Mode = Mode.design;
  display: Display = Display.compress;
  data: INode[] = [];
  current: INode = null;

  setMode = (mode: Mode) => (this.mode = mode);

  setDisplay = (display: Display) => (this.display = display);

  toggleDisplay = () => {
    this.display = this.contraryDisplay;
  };

  get contraryDisplay() {
    return Display.compress === this.display
      ? Display.expand
      : Display.compress;
  }

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
    return JSON.stringify(this.schema, null, "  ");
  }

  set source(value) {
    try {
      this.schema = JSON.parse(value);
    } catch{ }
  }

  set schema(value) {
    const root = fromSchema(value);
    this.data = root.children;
  }

  get schema() {
    const root = new PropNode({
      type: Type.object,
      children: this.data,
      title: undefined,
      description: undefined
    });
    return toSchema(root);
  }
}
