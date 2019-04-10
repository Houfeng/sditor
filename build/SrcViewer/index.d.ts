import * as React from "react";
import { EditorModel } from "../models/Editor";
import "./index.less";
export interface ISrcViewerPorps {
    model: EditorModel;
}
export declare class SrcViewer extends React.Component<ISrcViewerPorps> {
    model: EditorModel;
    render(): JSX.Element;
}
