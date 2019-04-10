import * as React from "react";
import { EditorModel } from "../models/Editor";
import { INode } from "../models/PropNode";
import { Type } from "../models/Type";
import "./index.less";
export interface IDesignerPorps {
    model: EditorModel;
}
export declare class Designer extends React.Component<IDesignerPorps> {
    model: EditorModel;
    generateNodeProps: ({ node }: {
        node: any;
    }) => {
        title: JSX.Element;
        subtitle: Type;
        buttons: JSX.Element[];
    };
    renderNodeTitle(node: INode): JSX.Element;
    renderNodeSubTitle(node: INode): Type;
    renderNodeButtons(node: INode): JSX.Element[];
    renderTree(): JSX.Element;
    renderConf(): JSX.Element;
    render(): JSX.Element;
}
