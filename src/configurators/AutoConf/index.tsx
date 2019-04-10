import * as React from "react";
import { ArrayConf } from "../ArrayConf";
import { BasicConf, IConfProps } from "../BasicConf";
import { Type } from "../../models/Type";

export function AutoConf(props: IConfProps) {
  const { model, origin } = props;
  const key = model.id;
  if (model.type === Type.array) {
    return <ArrayConf key={key} model={model} origin={origin} />;
  }
  return <BasicConf key={key} model={model} origin={origin} />;
}
