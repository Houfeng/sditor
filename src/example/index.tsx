import * as React from "react";
import { Editor } from "../";
import { EditorModel } from "../models/Editor";
import { render } from "react-dom";
import "./index.less";

const schema = require("./test.json");

class App extends React.Component {
  onReady = (model: EditorModel) => {
    model.schema = schema;
  };

  render() {
    return (
      <div>
        <Editor onReady={this.onReady} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
