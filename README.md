# Sditor

![sditor](https://img.alicdn.com/tfs/TB1hLPuQCzqK1RjSZFLXXcn2XXa-2776-1134.png)

## 简介 

[ S ] chema + E [ Ditor ] = Sditor

Sditor 是一个 [JSON Schema](http://json-schema.org/) 图形化编辑器组件，Sditor 基于 [TypeScript](https://www.typescriptlang.org/) 编写的 [React](https://reactjs.org/) 组件，只有很少的 API，可快捷的集到任意的 React 工程中。

## 安装

```bash
npm install sditor -S
```

## 使用

```tsx
import * as React from "react";
import { Editor, EditorModel } from "sditor";

export class App extends React.Component {
  
  //EditorModel 实例
  editorModel: EditorModel;

  onEditorReady = (model:EditorModel)=> {
    //可在这里设定初始值
    model.schema = { ... };
    //暂存 EditorModel 实例
    this.editorModel = model;
  }

  onSave = ()=> {
    //通过 editorModel 可获取当前编辑的 schema
    const schema = this.editorModel.schema;
    console.log('schema', schema);
  }

  render () {
    return <div>
      <Editor onReady={this.onEditorReady} />
      <button onClick={this.onSave}>Save</button>
    </div>;
  }
  
}
```