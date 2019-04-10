import * as React from "react";
import { binding, model } from "mota";
import { EditorModel } from "../models/Editor";
import { Mode } from "../models/Mode";
import "./index.less";

export interface IToolbarPorps {
  model: EditorModel;
}

const items = [
  {
    icon: "edit",
    mode: Mode.design
  },
  {
    icon: "code",
    mode: Mode.source
  }
];

@model(EditorModel)
@binding
export class Toolbar extends React.Component<IToolbarPorps> {
  model: EditorModel;

  renderItems() {
    const { setMode, mode } = this.model;
    return items.map(item => {
      const active = item.mode === mode ? "active" : "";
      return (
        <i
          key={item.mode}
          className={`fa fa-${item.icon} ${active}`}
          onClick={() => setMode(item.mode)}
        />
      );
    });
  }

  render() {
    return <div>{this.renderItems()}</div>;
  }
}
