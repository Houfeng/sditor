import * as React from "react";
import { EditorModel } from "../models/Editor";
import "./index.less";
export interface IEditorPorps {
    onReady?: (model: EditorModel) => void;
}
export declare class Editor extends React.Component<IEditorPorps> {
    model: EditorModel;
    componentDidMount(): void;
    renderView(): JSX.Element;
    render(): JSX.Element;
}
