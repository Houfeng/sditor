import * as React from "react";
import { EditorModel } from "../models/Editor";
import "./index.less";
export interface IEditorPorps {
    value: any;
}
export declare class Editor extends React.Component<IEditorPorps> {
    model: EditorModel;
    renderView(): JSX.Element;
    render(): JSX.Element;
}
