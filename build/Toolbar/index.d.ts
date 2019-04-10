import * as React from "react";
import { EditorModel } from "../models/Editor";
import "./index.less";
export interface IToolbarPorps {
    model: EditorModel;
}
export declare class Toolbar extends React.Component<IToolbarPorps> {
    model: EditorModel;
    renderItems(): JSX.Element[];
    render(): JSX.Element;
}
