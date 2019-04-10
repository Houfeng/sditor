import * as React from "react";
import "./index.less";
export interface ITypePickerPorps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    [name: string]: any;
}
export declare function TypePicker(props: ITypePickerPorps): JSX.Element;
