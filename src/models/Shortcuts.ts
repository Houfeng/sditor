import { Type } from "./Type";

export const commonShortcuts = {
  // tslint:disable-next-line
  "requried": false,
  "x-widget": null,
  "x-options": null
};

export const ShortcutMaps = {
  object: {
    ...commonShortcuts
  },
  array: {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    ...commonShortcuts
  },
  string: {
    default: "",
    ...commonShortcuts
  },
  number: {
    default: 0,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    ...commonShortcuts
  },
  boolean: {
    default: false,
    ...commonShortcuts
  }
};

export function getShortcuts(type: Type) {
  const definition = ShortcutMaps[type] || {};
  const keys = Object.keys(definition);
  return { definition, keys };
}
