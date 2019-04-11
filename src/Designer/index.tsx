import * as React from "react";
import SortableTree from "react-sortable-tree";
import { binding, model } from "mota";
import { EditorModel } from "../models/Editor";
import { INode, PropNode } from "../models/PropNode";
import { Type } from "../models/Type";
import "./index.less";
import DockPanel = require("react-dock-panel");
import { AutoConf } from "../configurators/AutoConf";

export interface IDesignerPorps {
  model: EditorModel;
  editor: any;
}

@model(EditorModel)
@binding
export class Designer extends React.Component<IDesignerPorps> {
  model: EditorModel;

  generateNodeProps = ({ node, path }) => {
    const title = this.renderNodeTitle(node);
    const buttons = this.renderNodeButtons(node, path);
    const subtitle = this.renderNodeSubTitle(node);
    return { title, subtitle, buttons };
  };

  renderNodeTitle(node: INode) {
    const { current, setCurrent } = this.model;
    const { id, name, title } = node;
    const active = current && current.id === id ? "active" : "";
    const showTitle = name === title ? name : `${name}: ${title}`;
    return (
      <span className={`title ${active}`} onClick={() => setCurrent(node)}>
        {node.isItems ? node.name : showTitle}
      </span>
    );
  }

  renderNodeSubTitle(node: INode) {
    const { setCurrent } = this.model;
    return <span onClick={() => setCurrent(node)}>{node.type}</span>;
  }

  renderNodeButtons(node: INode, path: string[]) {
    const { addToParent, remove, setCurrent } = this.model;
    const items = [
      {
        button: (
          <i
            key="edit"
            className="fa fa-edit"
            onClick={() => setCurrent(node)}
          />
        ),
        check: (node: INode) =>
          [
            Type.object,
            Type.array,
            Type.string,
            Type.number,
            Type.boolean
          ].includes(node.type)
      },
      {
        button: (
          <i
            key="add"
            className="fa fa-plus"
            onClick={() => addToParent(node)}
          />
        ),
        check: (node: INode) => [Type.object].includes(node.type)
      },
      {
        button: (
          <i
            key="remove"
            className="fa fa-remove"
            onClick={() => remove(path)}
          />
        ),
        check: (node: INode) =>
          !node.isItems &&
          [
            Type.object,
            Type.array,
            Type.string,
            Type.number,
            Type.boolean
          ].includes(node.type)
      }
    ];
    return items.filter(item => item.check(node)).map(item => item.button);
  }

  renderPlaceholder() {
    return <div className="placeholder">No content</div>;
  }

  renderTree() {
    const { data, setData } = this.model;
    if (!data || data.length < 1) return this.renderPlaceholder();
    const { canNodeHaveChildren, canDrop, canDrag, getNodeKey } = PropNode;
    return (
      <SortableTree
        rowHeight={38}
        canDrop={canDrop}
        canDrag={canDrag}
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
    return <AutoConf key={current.id} model={current} origin={origin} />;
  }

  render() {
    const { add, toggleDisplay, contraryDisplay } = this.model;
    return (
      <DockPanel className="designer">
        <DockPanel dock="right" className="conf">
          <DockPanel className="topbar" dock="top">
            <span className="caption">CONF</span>
            <i
              className={`fa fa-${contraryDisplay} fullscreen`}
              onClick={toggleDisplay}
            />
          </DockPanel>
          <DockPanel dock="fill" className="inner">
            {this.renderConf()}
          </DockPanel>
        </DockPanel>
        <DockPanel className="tree" dock="fill">
          <DockPanel className="topbar" dock="top">
            <span className="caption">DESIGN</span>
            <i className="fa fa-plus add" onClick={add} />
          </DockPanel>
          <DockPanel dock="fill">{this.renderTree()}</DockPanel>
        </DockPanel>
      </DockPanel>
    );
  }
}
