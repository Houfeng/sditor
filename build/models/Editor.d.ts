import { INode } from "./PropNode";
import { Mode } from "./Mode";
export declare class EditorModel {
    mode: Mode;
    data: INode[];
    current: INode;
    setMode: (mode: Mode) => Mode;
    setCurrent: (node: INode) => void;
    add: () => void;
    remove: (path: string[]) => void;
    addToParent: (parent: INode) => void;
    setData: (data: any) => void;
    source: string;
    schema: any;
}
