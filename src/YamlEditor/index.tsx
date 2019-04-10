import * as React from "react";
import CodeMirror from "codemirror-react";
import "./index.less";

export function YamlEditor(props: any) {
  const {
    label,
    alert = "Writing in Yaml",
    value,
    onChange,
    ...others
  } = props;
  return (
    <div className="control yaml-editor">
      <label>
        {label}
        <span className="alert">{alert}</span>
      </label>
      <CodeMirror
        value={value}
        onChange={onChange}
        mode="yaml"
        theme="elegant"
        tabSize={2}
        lineNumbers={true}
        {...others}
      />
    </div>
  );
}
