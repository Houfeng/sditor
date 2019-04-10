import * as React from "react";
import SortableTree from "react-sortable-tree";
import { BasicConf } from "../configurators/BasicConf";
import { binding, model } from "mota";
import { EditorModel } from "../models/Editor";
import { INode, PropNode } from "../models/PropNode";
import { Type } from "../models/Type";
import "./index.less";
import DockPanel = require("react-dock-panel");

export interface IDesignerPorps {
  model: EditorModel;
}

@model(EditorModel)
@binding
export class Designer extends React.Component<IDesignerPorps> {
  model: EditorModel;

  generateNodeProps = ({ node }) => {
    const title = this.renderNodeTitle(node);
    const buttons = this.renderNodeButtons(node);
    const subtitle = this.renderNodeSubTitle(node);
    return { title, subtitle, buttons };
  };

  renderNodeTitle(node: INode) {
    const { current, setCurrent } = this.model;
    const active = current.id === node.id ? "active" : "";
    return (
      <span className={`title ${active}`} onClick={() => setCurrent(node)}>
        {node.title}
      </span>
    );
  }

  renderNodeSubTitle(node: INode) {
    return node.type;
  }

  renderNodeButtons(node: INode) {
    const { addToParent, setCurrent } = this.model;
    const items = [
      {
        button: (
          <i
            key="edit"
            className="fa fa-edit"
            onClick={() => setCurrent(node)}
          />
        ),
        types: [Type.object, Type.array, Type.string, Type.number, Type.boolean]
      },
      {
        button: (
          <i
            key="add"
            className="fa fa-plus"
            onClick={() => addToParent(node)}
          />
        ),
        types: [Type.object]
      },
      {
        button: <i key="remove" className="fa fa-remove" />,
        types: [Type.object, Type.array, Type.string, Type.number, Type.boolean]
      }
    ];
    return items
      .filter(item => item.types.includes(node.type))
      .map(item => item.button);
  }

  renderTree() {
    const { data, setData } = this.model;
    const { canNodeHaveChildren, canDrop, getNodeKey } = PropNode;
    return (
      <SortableTree
        rowHeight={38}
        canDrop={canDrop}
        getNodeKey={getNodeKey}
        canNodeHaveChildren={canNodeHaveChildren}
        generateNodeProps={this.generateNodeProps}
        treeData={[...data]}
        onChange={setData}
      />
    );
  }

  renderConf() {
    const { current } = this.model;
    if (!current) return;
    const origin = JSON.parse(JSON.stringify(current));
    return <BasicConf key={current.id} model={current} origin={origin} />;
  }

  render() {
    const { add: addNode } = this.model;
    return (
      <DockPanel className="designer">
        <DockPanel className="conf" dock="right">
          {this.renderConf()}
        </DockPanel>
        <DockPanel className="topbar" dock="top">
          <i className="fa fa-plus add" onClick={addNode} />
        </DockPanel>
        <DockPanel className="tree" dock="fill">
          {this.renderTree()}
        </DockPanel>
      </DockPanel>
    );
  }
}
