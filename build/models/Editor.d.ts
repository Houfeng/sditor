import { INode } from "./PropNode";
import { Mode } from "./Mode";
export declare class EditorModel {
    mode: Mode;
    data: INode[];
    current: INode;
    setCurrent: (node: INode) => void;
    add: () => void;
    remove: (path: string[]) => void;
    addToParent: (parent: INode) => void;
    setData: (data: any) => void;
    readonly source: string;
    readonly schema: any;
    setMode: (mode: Mode) => Mode;
}
