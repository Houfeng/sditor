# Sditor

![sditor](https://img.alicdn.com/tfs/TB1pHK_QCzqK1RjSZPcXXbTepXa-1942-772.png)

## Introduction 

[ S ] chema + E [ Ditor ] = Sditor

Sditor is a graphical editing component of [JSON Schema](http://json-schema.org/). It is a [React](https://www.typescriptlang.org/) component based on [TypeScript](https://reactjs.org/), which has very few APIs and can be quickly assembled into any React project.

## Installation

```bash
npm install sditor -S
```

## How to use

```tsx
import * as React from "react";
import { Editor, EditorModel } from "sditor";

export class App extends React.Component {
  
  //EditorModel instance
  editorModel: EditorModel;

  onEditorReady = (model:EditorModel)=> {
    //You can set the initial value here.
    model.schema = { ... };
    //Temporary EditorModel instance
    this.editorModel = model;
  }

  onSave = ()=> {
    //Get the current schema through editorModel
    const schema = this.editorModel.schema;
    console.log('schema', schema);
  }

  render () {
    return <div>
      <Editor onReady={this.onEditorReady} style={{height: 500}} />
      <button onClick={this.onSave}>Save</button>
    </div>;
  }
  
}
```

## Contributing to Sditor

- Dependent build tools need to be installed [dawn] (https://github.com/alibaba/dawn)
- Fork this repo, and clone to the local
- Start development services through `dn dev'
- Improve or add new features, submitted through PR