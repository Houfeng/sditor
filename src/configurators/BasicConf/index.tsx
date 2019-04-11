import * as React from "react";
import { binding, model, watch } from "mota";
import { INode, PropNode } from "../../models/PropNode";
import { Input } from "../../Input";
import { Type } from "../../models/Type";
import { TypePicker } from "../../TypePicker";
import { YamlEditor } from "../../YamlEditor";
import "./index.less";

export interface IConfProps {
  model: INode;
  origin?: INode;
}

@model
@binding
export class BasicConf extends React.Component<IConfProps> {
  model: INode;

  render() {
    if (!this.props.model) return <span />;
    return (
      <div className="node-conf">
        {this.renderBasic()}
        {this.renderMore()}
      </div>
    );
  }

  renderBasic() {
    const { isItems } = this.model;
    return (
      <div>
        <TypePicker data-bind="type" />
        <Input label="Field:" type="text" data-bind="name" disabled={isItems} />
        <Input label="Title:" type="text" data-bind="title" />
        <Input label="Description:" type="text" data-bind="description" />
      </div>
    );
  }

  renderMore() {
    const { type } = this.model;
    return (
      <div>
        <YamlEditor type={type} label="More:" data-bind="more" />
      </div>
    );
  }

  @watch((model: INode) => model.type)
  onTypeChange() {
    const { type } = this.model;
    if (type === Type.array) {
      const name = "items",
        title = name,
        isItems = true;
      this.model.children = [new PropNode({ name, title, isItems })];
    } else {
      this.model.children = [];
    }
  }
}
