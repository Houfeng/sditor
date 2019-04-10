import * as React from "react";
import { binding, model, watch } from "mota";
import { Input } from "../../Input";
import { INode, PropNode } from "../../models/PropNode";
import { Type } from "../../models/Type";
import { TypePicker } from "../../TypePicker";
import "./index.less";

export interface IBasicConf {
  model: INode;
  origin?: INode;
}

@model
@binding
export class BasicConf extends React.Component<IBasicConf> {
  model: INode;
  render() {
    if (!this.props.model) return <span />;
    return (
      <div className="node-conf">
        <TypePicker data-bind="type" />
        <Input label="Name:" type="text" data-bind="name" />
        <Input label="Title" type="text" data-bind="title" />
        <Input label="Description:" type="text" data-bind="description" />
      </div>
    );
  }

  @watch((model: INode) => `${model.id}:${model.type}`)
  onTypeChange() {
    const { type } = this.model;
    if (type === Type.array) {
      const name = "items",
        title = name;
      this.model.children = [new PropNode({ name, title })];
      return;
    }
    if (type !== Type.object) {
      this.model.children = [];
    }
  }
}
