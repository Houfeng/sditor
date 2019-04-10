import * as React from "react";
import { INode } from "../../models/PropNode";
import "./index.less";
export interface IBasicConf {
    model: INode;
    origin?: INode;
}
export declare class BasicConf extends React.Component<IBasicConf> {
    model: INode;
    render(): JSX.Element;
    onTypeChange(): void;
}
