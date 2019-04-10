import * as React from "react";
import { render } from "react-dom";
import { Editor } from "../";
import "./index.less";

const schema = require("./test.json");

class App extends React.Component {
  state = { schema };

  render() {
    const { schema } = this.state;
    return (
      <div>
        <Editor value={schema} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
