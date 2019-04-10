import * as React from "react";
import "./index.less";

let uuid = 0;

export function Input(props: any) {
  const { label, id = "input-" + uuid++, ...others } = props;
  return (
    <div className="control input">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...others} />
    </div>
  );
}
