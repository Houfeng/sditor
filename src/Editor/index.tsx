import * as React from "react";
import { binding, model } from "mota";
import { Designer } from "../Designer";
import { EditorModel } from "../models/Editor";
import { Mode } from "../models/Mode";
import { SrcViewer } from "../SrcViewer";
import { Toolbar } from "../Toolbar";
import DockPanel = require("react-dock-panel");
import "./index.less";

export interface IEditorPorps {
  onReady?: (model: EditorModel) => void;
}

@model(EditorModel)
@binding
export class Editor extends React.Component<IEditorPorps> {
  model: EditorModel;

  componentDidMount() {
    const { onReady } = this.props;
    if (onReady) onReady(this.model);
  }

  renderView() {
    const { mode } = this.model;
    if (mode === Mode.design) return <Designer model={this.model} />;
    return <SrcViewer model={this.model} />;
  }

  render() {
    (window as any).model = this.model;
    return (
      <DockPanel className="sditor">
        <DockPanel className="toolbar" dock="left">
          <Toolbar model={this.model} />
        </DockPanel>
        <DockPanel className="view" dock="fill">
          {this.renderView()}
        </DockPanel>
      </DockPanel>
    );
  }
}
