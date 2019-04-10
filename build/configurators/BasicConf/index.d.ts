import * as React from "react";
import { INode } from "../../models/PropNode";
import "./index.less";
export interface IConfProps {
    model: INode;
    origin?: INode;
}
export declare class BasicConf extends React.Component<IConfProps> {
    model: INode;
    render(): JSX.Element;
    renderBasic(): JSX.Element;
    renderMore(): JSX.Element;
    onTypeChange(): void;
}
