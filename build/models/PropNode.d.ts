import { Type } from "./Type";
export interface INode {
    id?: string;
    type?: Type;
    name?: string;
    title?: string;
    description?: string;
    children?: INode[];
    expanded?: boolean;
}
export declare class PropNode implements INode {
    id: string;
    type: Type;
    name: string;
    title: string;
    children: INode[];
    expanded: boolean;
    description: string;
    isType(type: Type): boolean;
    constructor(opts?: INode);
    static canNodeHaveChildren: (node: INode) => boolean;
    static canDrop: (opts: any) => boolean;
    static modelify(list: INode[]): PropNode[];
    static getNodeKey: ({ node }: {
        node: any;
    }) => any;
}
