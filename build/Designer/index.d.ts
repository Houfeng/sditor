import * as React from "react";
import { EditorModel } from "../models/Editor";
import { INode } from "../models/PropNode";
import "./index.less";
export interface IDesignerPorps {
    model: EditorModel;
}
export declare class Designer extends React.Component<IDesignerPorps> {
    model: EditorModel;
    generateNodeProps: ({ node, path }: {
        node: any;
        path: any;
    }) => {
        title: JSX.Element;
        subtitle: JSX.Element;
        buttons: JSX.Element[];
    };
    renderNodeTitle(node: INode): JSX.Element;
    renderNodeSubTitle(node: INode): JSX.Element;
    renderNodeButtons(node: INode, path: string[]): JSX.Element[];
    renderPlaceholder(): JSX.Element;
    renderTree(): JSX.Element;
    renderConf(): JSX.Element;
    render(): JSX.Element;
}
