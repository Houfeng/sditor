---
group: guide
name: dev
title: 开发扩展
index: 1
---

# 开发扩展

Formor 具备一个可灵活扩展的结构，本文将介绍一下如何扩展 Formor。
扩展是为了扩展 Formor 的部件类型，以提供更多的能力，让使用 Formor 的系统能更深度的集成，
比如，在项目可扩展「文件上传」部件。

API 说明A: [点击查看详细 API 说明](../api)

## 开发自定义 Renderder

在这里通过简单 `StringRenderer` 来做一个说明，
每个 `Renderer` 都分成了 `View` 和 `Model` 两部分。

`View` 的实现代码及说明：

```js
import * as React from "react";
import { model } from "mota";
import { Renderer } from "@ali/formor";
import { StringViewModel } from "./ViewModel";
import "./index.less";

const { Input } = require("@ali/aps");
const { isNull } = require("ntils");

@model(StringViewModel)
export class StringRenderer extends Renderer {

  //声明处理的数据类型 （和 widget 任选其一指定或同时指定）
  //自定义 renderer 一般同时指定
  static type = "string";

  //声明 widget 名称（和 type 任选其一指定或同时指定）
  //自定义 renderer 一般同时指定
  static widget = 'custom'

  //编辑数据「正规化」处理函数
  //value  : 当前值
  //schema : 当前 shcema 描述
  //field  : 当前字段
  static normalize(value, schema, field) {
    return String(value || "");
  }

  //声明是否支持「缩略」模式
  protected thumbable = false;

  //组件的顶层 HTML 容器的 `class` 方便写样式
  protected className = "string";

  protected onChange = event => {
    this.model.value = event.target.value;
    //在改变了模型数据后，需触发 `change`，参数可指定「节流时间（单位 ms）」
    this.triggerChange(300);
    //因为自定义 widget 常用处理一个完整的自定义对象，
    //如果进行自定义验证，可将验证结果反馈出来
    this.setValidateResult({state:false, message:'错误消息'});
  };

  //组件渲染函数
  protected renderEditor() {
    //除了 value ，从 model 上还能获取 `schema`、`field`
    const { value } = this.model;
    return (
      <Input
        size="small"
        value={isNull(value) ? "" : value}
        onChange={this.onChange}
      />
    );
  }
}

```

`Model` 的实现及说明:

```js
import { RendererViewModel } from "@ali/formor";

//ViewModel 通常不用有太多处理
//如果有需要可在 model 中增加处理方法和成员
export class StringViewModel extends RendererViewModel {
}
```

## 注册自定义 Renderder

```js
import { Form } from "@ali/formor";

//通过 `Form.register` 进行自定义 `renderer` 的注册
Form.register(YourRenderer);
```

`renderer` 在注册后就可使用了，通过 `JSON Schema` 的扩展字段 `widget` 
声明某个数据项使用自定义的 `widget` 进行渲染和编辑。

```json
{
  "type": "object",
  "properties": {
    "test": {
      "title": "测试",
      "type": "string",
      "widget": "your_widget"
    }
  }
}
```