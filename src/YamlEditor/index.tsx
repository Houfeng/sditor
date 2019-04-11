import * as React from "react";
import CodeMirror from "codemirror-react";
import { dumpMore, loadMore } from "../models/Converter";
import { getShortcuts } from "../models/Shortcuts";
import "./index.less";

export class YamlEditor extends React.Component<any> {
  onShortcutChoice = event => {
    const { type, value, onChange } = this.props;
    if (!onChange) return;
    const { definition } = getShortcuts(type);
    const choiceKey = event.target.value;
    const descriptor = { [choiceKey]: definition[choiceKey] };
    onChange(dumpMore({ ...loadMore(value), ...descriptor }));
  };

  renderShortcutList() {
    const { type } = this.props;
    const { keys } = getShortcuts(type);
    return (
      <select value="" className="shortcut" onChange={this.onShortcutChoice}>
        <option value="">Shortcut...</option>
        {keys.map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    );
  }

  renderHead() {
    const { label } = this.props;
    return (
      <label>
        {label}
        {this.renderShortcutList()}
      </label>
    );
  }

  renderEditor() {
    const { label, value, onChange, ...others } = this.props;
    return (
      <CodeMirror
        value={value}
        onChange={onChange}
        mode="yaml"
        theme="elegant"
        tabSize={2}
        lineNumbers={true}
        {...others}
      />
    );
  }

  render() {
    return (
      <div className="control yaml-editor">
        {this.renderHead()}
        {this.renderEditor()}
      </div>
    );
  }
}
