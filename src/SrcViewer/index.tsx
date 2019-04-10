import * as React from "react";
import CodeMirror from "codemirror-react";
import { binding, model } from "mota";
import { EditorModel } from "../models/Editor";
import "./index.less";

export interface ISrcViewerPorps {
  model: EditorModel;
}

@model(EditorModel)
@binding
export class SrcViewer extends React.Component<ISrcViewerPorps> {
  model: EditorModel;

  render() {
    const { source } = this.model;
    return (
      <CodeMirror
        value={source}
        mode="javascript"
        theme="elegant"
        tabSize={2}
        readOnly={true}
        lineNumbers={true}
      />
    );
  }
}
