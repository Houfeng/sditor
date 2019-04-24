import * as React from "react";
import CodeMirror from "codemirror-react";
import { binding, model } from "mota";
import { EditorModel } from "../models/Editor";
import DockPanel = require("react-dock-panel");
import "./index.less";

export interface ISrcViewerPorps {
  model: EditorModel;
  editor: any;
}

@model
@binding
export class SrcViewer extends React.Component<ISrcViewerPorps> {
  model: EditorModel;

  render() {
    const { toggleDisplay, contraryDisplay } = this.model;
    return (
      <DockPanel className="source">
        <DockPanel className="topbar" dock="top">
          <span className="caption">SOURCE</span>
          <i
            className={`fa fa-${contraryDisplay} fullscreen`}
            onClick={toggleDisplay}
          />
        </DockPanel>
        <DockPanel dock="fill">
          <CodeMirror data-bind="source" mode="javascript" theme="elegant" />
        </DockPanel>
      </DockPanel>
    );
  }
}
