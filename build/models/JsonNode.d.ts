import { INode } from "./PropNode";
export interface IMap {
    [name: string]: any;
}
export declare function loadMore(more: string): any;
export declare class JsonNode {
    private node;
    constructor(node: INode);
    toJSON(): IMap;
}
