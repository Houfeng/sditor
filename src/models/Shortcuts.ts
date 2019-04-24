import { Type } from "./Type";

export const commonShortcuts = {
  // tslint:disable-next-line
  "requried": true,
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
    enum: ["A", "B", "C"],
    ...commonShortcuts
  },
  number: {
    default: 0,
    enum: [1, 2, 3],
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
