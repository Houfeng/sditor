import * as React from "react";
import { Type } from "../models/Type";
import "./index.less";

export interface ITypePickerPorps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  [name: string]: any;
}

function renderTypeOptions(types) {
  return Object.keys(types).map(name => (
    <option key={name} value={name}>
      {name}
    </option>
  ));
}

let uuid = 0;

export function TypePicker(props: ITypePickerPorps) {
  const { onChange, value, id = "select-" + uuid++, ...others } = props;
  return (
    <div className="control select">
      <label htmlFor={id} className="fa fa-ellipsis-v" />
      <select id={id} value={value} onChange={onChange} {...others}>
        {renderTypeOptions(Type)}
      </select>
    </div>
  );
}
