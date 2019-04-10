# Formor

![img](https://img.alicdn.com/tfs/TB1YKZNomzqK1RjSZFpXXakSXXa-2014-946.png)

## 简介 

Formor 是一个基于 `JSON Schema` 的配置表单生成器，目前只发布到了厂内。
Formor 具备一个可灵活扩展的结构，可方便的扩展并集成到项目中。

JSON Schema 规范：[点击查看 JSON Schema 规范](http://json-schema.org/)

## 安装

```bash
tnpm i @ali/formor @ali/aps mota --save
``` 

## 使用

```jsx
import { Form } from '@ali/formor';
import '@ali/formor/build/css/index.css';

function App() {

  return (<Form 
    //描述数据的 Schema
    schema={schema}  
    //数据（根需是为一个对象）
    value={data}  
    //数据发了改变
    onChange={console.log}  
    //验证被触发
    onValidate={console.log}
  />);

} 
```

属性说明
- schema: 表单的 `JSON Schema` 描述
- value: 传递给表单的数据
- onChange: 在数据发生变化时的事件
- onValidate: 在验证被触发发时的事件，（参数格式 Array<{state:bool,message:string}>）