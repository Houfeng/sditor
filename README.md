# Sditor

![sditor](https://img.alicdn.com/tfs/TB1pHK_QCzqK1RjSZPcXXbTepXa-1942-772.png)

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
      <Editor onReady={this.onEditorReady} style={{height: 500}} />
      <button onClick={this.onSave}>Save</button>
    </div>;
  }
  
}
```

## 贡献

- 需要安装依赖的构建工具 [dawn](https://github.com/alibaba/dawn)
- fork 这个 repo，并 clone 到本地
- 通过 `dn dev` 启动开发服务
- 改进或增加新的 features ，通过 PR 提交