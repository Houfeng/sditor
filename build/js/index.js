(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("mota"), require("react-dock-panel"), require("codemirror-react"), require("react-sortable-tree"), require("js-yaml"), require("shortid"));
	else if(typeof define === 'function' && define.amd)
		define("sditor", [, , , , , , ], factory);
	else if(typeof exports === 'object')
		exports["sditor"] = factory(require("react"), require("mota"), require("react-dock-panel"), require("codemirror-react"), require("react-sortable-tree"), require("js-yaml"), require("shortid"));
	else
		root["sditor"] = factory(root[undefined], root[undefined], root[undefined], root[undefined], root[undefined], root[undefined], root[undefined]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_18__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type["string"] = "string";
    Type["number"] = "number";
    Type["boolean"] = "boolean";
    Type["object"] = "object";
    Type["array"] = "array";
})(Type = exports.Type || (exports.Type = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PropNode_1 = __webpack_require__(4);
var Mode_1 = __webpack_require__(5);
var react_sortable_tree_1 = __webpack_require__(7);
var Type_1 = __webpack_require__(1);
var Converter_1 = __webpack_require__(19);
var EditorModel = /** @class */ (function () {
    function EditorModel() {
        var _this = this;
        this.mode = Mode_1.Mode.design;
        this.data = [];
        this.current = null;
        this.setMode = function (mode) { return (_this.mode = mode); };
        this.setCurrent = function (node) {
            _this.current = node;
        };
        this.add = function () {
            var newNode = new PropNode_1.PropNode();
            _this.data = PropNode_1.PropNode.modelify(_this.data.concat([newNode]));
            _this.current = newNode;
        };
        this.remove = function (path) {
            var treeData = _this.data, getNodeKey = PropNode_1.PropNode.getNodeKey;
            var result = react_sortable_tree_1.removeNodeAtPath({ treeData: treeData, path: path, getNodeKey: getNodeKey });
            _this.data = PropNode_1.PropNode.modelify(result.slice());
        };
        this.addToParent = function (parent) {
            var newNode = new PropNode_1.PropNode();
            parent.children = parent.children.concat([newNode]);
            parent.expanded = true;
            _this.data = PropNode_1.PropNode.modelify(_this.data.slice());
            _this.current = newNode;
        };
        this.setData = function (data) {
            _this.data = PropNode_1.PropNode.modelify(data);
        };
    }
    Object.defineProperty(EditorModel.prototype, "source", {
        get: function () {
            return JSON.stringify(this.schema, null, "  ");
        },
        set: function (value) {
            this.schema = JSON.parse(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorModel.prototype, "schema", {
        get: function () {
            var root = new PropNode_1.PropNode({
                type: Type_1.Type.object,
                children: this.data,
                title: undefined,
                description: undefined
            });
            return Converter_1.toSchema(root);
        },
        set: function (value) {
            var root = Converter_1.fromSchema(value);
            this.data = root.children;
        },
        enumerable: true,
        configurable: true
    });
    return EditorModel;
}());
exports.EditorModel = EditorModel;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Type_1 = __webpack_require__(1);
var shortid = __webpack_require__(18);
shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$");
var PropNode = /** @class */ (function () {
    function PropNode(opts) {
        this.id = "F" + shortid.generate();
        this.type = Type_1.Type.object;
        this.name = this.id;
        this.title = this.name;
        this.children = [];
        this.expanded = false;
        this.description = "";
        this.more = "";
        if (opts)
            Object.assign(this, opts);
    }
    PropNode.prototype.isType = function (type) {
        return this.type === type;
    };
    PropNode.modelify = function (list) {
        var _this = this;
        return list.map(function (item) {
            var node = item instanceof PropNode ? item : new PropNode(item);
            node.children = _this.modelify(node.children);
            return node;
        });
    };
    PropNode.canNodeHaveChildren = function (node) {
        return node.type === Type_1.Type.object || node.type === Type_1.Type.array;
    };
    PropNode.canDrop = function (opts) {
        var nextParent = opts.nextParent;
        return !nextParent || nextParent.type === Type_1.Type.object;
    };
    PropNode.canDrag = function (opts) {
        var node = opts.node;
        return node && !node.isItems;
    };
    PropNode.getNodeKey = function (_a) {
        var node = _a.node;
        return node.id;
    };
    return PropNode;
}());
exports.PropNode = PropNode;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Mode;
(function (Mode) {
    Mode["design"] = "design";
    Mode["source"] = "source";
})(Mode = exports.Mode || (exports.Mode = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var mota_1 = __webpack_require__(2);
var PropNode_1 = __webpack_require__(4);
var Input_1 = __webpack_require__(24);
var Type_1 = __webpack_require__(1);
var TypePicker_1 = __webpack_require__(26);
var YamlEditor_1 = __webpack_require__(28);
__webpack_require__(30);
var BasicConf = /** @class */ (function (_super) {
    __extends(BasicConf, _super);
    function BasicConf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicConf.prototype.render = function () {
        if (!this.props.model)
            return React.createElement("span", null);
        return (React.createElement("div", { className: "node-conf" },
            this.renderBasic(),
            this.renderMore()));
    };
    BasicConf.prototype.renderBasic = function () {
        var isItems = this.model.isItems;
        return (React.createElement("div", null,
            React.createElement(TypePicker_1.TypePicker, { "data-bind": "type" }),
            React.createElement(Input_1.Input, { label: "Field:", type: "text", "data-bind": "name", disabled: isItems }),
            React.createElement(Input_1.Input, { label: "Title:", type: "text", "data-bind": "title" }),
            React.createElement(Input_1.Input, { label: "Description:", type: "text", "data-bind": "description" })));
    };
    BasicConf.prototype.renderMore = function () {
        return (React.createElement("div", null,
            React.createElement(YamlEditor_1.YamlEditor, { label: "More:", "data-bind": "more" })));
    };
    BasicConf.prototype.onTypeChange = function () {
        var type = this.model.type;
        if (type === Type_1.Type.array) {
            var name_1 = "items", title = name_1, isItems = true;
            this.model.children = [new PropNode_1.PropNode({ name: name_1, title: title, isItems: isItems })];
        }
        else {
            this.model.children = [];
        }
    };
    __decorate([
        mota_1.watch(function (model) { return model.type; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BasicConf.prototype, "onTypeChange", null);
    BasicConf = __decorate([
        mota_1.model,
        mota_1.binding
    ], BasicConf);
    return BasicConf;
}(React.Component));
exports.BasicConf = BasicConf;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
__export(__webpack_require__(16));


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var mota_1 = __webpack_require__(2);
var Designer_1 = __webpack_require__(17);
var Editor_1 = __webpack_require__(3);
var Mode_1 = __webpack_require__(5);
var SrcViewer_1 = __webpack_require__(31);
var Toolbar_1 = __webpack_require__(33);
var DockPanel = __webpack_require__(6);
__webpack_require__(35);
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Editor.prototype.componentDidMount = function () {
        var onReady = this.props.onReady;
        if (onReady)
            onReady(this.model);
    };
    Editor.prototype.renderView = function () {
        var mode = this.model.mode;
        if (mode === Mode_1.Mode.design)
            return React.createElement(Designer_1.Designer, { model: this.model });
        return React.createElement(SrcViewer_1.SrcViewer, { model: this.model });
    };
    Editor.prototype.render = function () {
        window.model = this.model;
        return (React.createElement(DockPanel, { className: "sditor" },
            React.createElement(DockPanel, { className: "toolbar", dock: "left" },
                React.createElement(Toolbar_1.Toolbar, { model: this.model })),
            React.createElement(DockPanel, { className: "view", dock: "fill" }, this.renderView())));
    };
    Editor = __decorate([
        mota_1.model(Editor_1.EditorModel),
        mota_1.binding
    ], Editor);
    return Editor;
}(React.Component));
exports.Editor = Editor;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_sortable_tree_1 = __webpack_require__(7);
var mota_1 = __webpack_require__(2);
var Editor_1 = __webpack_require__(3);
var PropNode_1 = __webpack_require__(4);
var Type_1 = __webpack_require__(1);
__webpack_require__(21);
var DockPanel = __webpack_require__(6);
var AutoConf_1 = __webpack_require__(22);
var Designer = /** @class */ (function (_super) {
    __extends(Designer, _super);
    function Designer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.generateNodeProps = function (_a) {
            var node = _a.node, path = _a.path;
            var title = _this.renderNodeTitle(node);
            var buttons = _this.renderNodeButtons(node, path);
            var subtitle = _this.renderNodeSubTitle(node);
            return { title: title, subtitle: subtitle, buttons: buttons };
        };
        return _this;
    }
    Designer.prototype.renderNodeTitle = function (node) {
        var _a = this.model, current = _a.current, setCurrent = _a.setCurrent;
        var id = node.id, name = node.name, title = node.title;
        var active = current && current.id === id ? "active" : "";
        var showTitle = name === title ? name : name + ": " + title;
        return (React.createElement("span", { className: "title " + active, onClick: function () { return setCurrent(node); } }, node.isItems ? node.name : showTitle));
    };
    Designer.prototype.renderNodeSubTitle = function (node) {
        var setCurrent = this.model.setCurrent;
        return React.createElement("span", { onClick: function () { return setCurrent(node); } }, node.type);
    };
    Designer.prototype.renderNodeButtons = function (node, path) {
        var _a = this.model, addToParent = _a.addToParent, remove = _a.remove, setCurrent = _a.setCurrent;
        var items = [
            {
                button: (React.createElement("i", { key: "edit", className: "fa fa-edit", onClick: function () { return setCurrent(node); } })),
                check: function (node) {
                    return [
                        Type_1.Type.object,
                        Type_1.Type.array,
                        Type_1.Type.string,
                        Type_1.Type.number,
                        Type_1.Type.boolean
                    ].includes(node.type);
                }
            },
            {
                button: (React.createElement("i", { key: "add", className: "fa fa-plus", onClick: function () { return addToParent(node); } })),
                check: function (node) { return [Type_1.Type.object].includes(node.type); }
            },
            {
                button: (React.createElement("i", { key: "remove", className: "fa fa-remove", onClick: function () { return remove(path); } })),
                check: function (node) {
                    return !node.isItems &&
                        [
                            Type_1.Type.object,
                            Type_1.Type.array,
                            Type_1.Type.string,
                            Type_1.Type.number,
                            Type_1.Type.boolean
                        ].includes(node.type);
                }
            }
        ];
        return items.filter(function (item) { return item.check(node); }).map(function (item) { return item.button; });
    };
    Designer.prototype.renderPlaceholder = function () {
        return React.createElement("div", { className: "placeholder" }, "No content");
    };
    Designer.prototype.renderTree = function () {
        var _a = this.model, data = _a.data, setData = _a.setData;
        if (!data || data.length < 1)
            return this.renderPlaceholder();
        var canNodeHaveChildren = PropNode_1.PropNode.canNodeHaveChildren, canDrop = PropNode_1.PropNode.canDrop, canDrag = PropNode_1.PropNode.canDrag, getNodeKey = PropNode_1.PropNode.getNodeKey;
        return (React.createElement(react_sortable_tree_1.default, { rowHeight: 38, canDrop: canDrop, canDrag: canDrag, getNodeKey: getNodeKey, canNodeHaveChildren: canNodeHaveChildren, generateNodeProps: this.generateNodeProps, treeData: data.slice(), onChange: setData }));
    };
    Designer.prototype.renderConf = function () {
        var current = this.model.current;
        if (!current)
            return;
        var origin = JSON.parse(JSON.stringify(current));
        return React.createElement(AutoConf_1.AutoConf, { key: current.id, model: current, origin: origin });
    };
    Designer.prototype.render = function () {
        var addNode = this.model.add;
        return (React.createElement(DockPanel, { className: "designer" },
            React.createElement(DockPanel, { dock: "right", className: "conf" },
                React.createElement(DockPanel, { className: "topbar", dock: "top" },
                    React.createElement("span", { className: "caption" }, "CONF")),
                React.createElement(DockPanel, { dock: "fill", className: "inner" }, this.renderConf())),
            React.createElement(DockPanel, { className: "tree", dock: "fill" },
                React.createElement(DockPanel, { className: "topbar", dock: "top" },
                    React.createElement("span", { className: "caption" }, "DESIGN"),
                    React.createElement("i", { className: "fa fa-plus add", onClick: addNode })),
                React.createElement(DockPanel, { dock: "fill" }, this.renderTree()))));
    };
    Designer = __decorate([
        mota_1.model(Editor_1.EditorModel),
        mota_1.binding
    ], Designer);
    return Designer;
}(React.Component));
exports.Designer = Designer;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_yaml_1 = __webpack_require__(20);
var PropNode_1 = __webpack_require__(4);
var Type_1 = __webpack_require__(1);
function dumpMore(more) {
    if (!more || Object.keys(more).length < 1)
        return "";
    try {
        return js_yaml_1.dump(more);
    }
    catch (_a) {
        return "";
    }
}
exports.dumpMore = dumpMore;
function loadMore(more) {
    try {
        return js_yaml_1.load(more);
    }
    catch (_a) {
        return {};
    }
}
exports.loadMore = loadMore;
function toSchema(node) {
    var type = node.type, title = node.title, description = node.description, children = node.children, more = node.more;
    var descriptor = { type: type, title: title, description: description };
    if (type === Type_1.Type.object && children && children.length > 0) {
        var properties_1 = {};
        children.forEach(function (node) { return (properties_1[node.name] = toSchema(node)); });
        descriptor.properties = properties_1;
    }
    if (type === Type_1.Type.array && children && children[0]) {
        descriptor.items = toSchema(children[0]);
    }
    Object.assign(descriptor, loadMore(more));
    return descriptor;
}
exports.toSchema = toSchema;
function fromSchema(descriptor, name, isItems) {
    if (name === void 0) { name = null; }
    if (isItems === void 0) { isItems = false; }
    name = name || undefined;
    var type = descriptor.type, title = descriptor.title, description = descriptor.description, items = descriptor.items, properties = descriptor.properties, more = __rest(descriptor, ["type", "title", "description", "items", "properties"]);
    var node = new PropNode_1.PropNode({ name: name, type: type, title: title, description: description, isItems: isItems });
    if (type === Type_1.Type.object && properties) {
        node.children = Object.keys(properties).map(function (name) {
            return fromSchema(properties[name], name);
        });
    }
    if (type === Type_1.Type.array && items) {
        node.children = [fromSchema(items, "items", true)];
    }
    node.more = dumpMore(more);
    return node;
}
exports.fromSchema = fromSchema;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ArrayConf_1 = __webpack_require__(23);
var BasicConf_1 = __webpack_require__(8);
var Type_1 = __webpack_require__(1);
function AutoConf(props) {
    var model = props.model, origin = props.origin;
    var key = model.id;
    if (model.type === Type_1.Type.array) {
        return React.createElement(ArrayConf_1.ArrayConf, { key: key, model: model, origin: origin });
    }
    return React.createElement(BasicConf_1.BasicConf, { key: key, model: model, origin: origin });
}
exports.AutoConf = AutoConf;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mota_1 = __webpack_require__(2);
var BasicConf_1 = __webpack_require__(8);
var ArrayConf = /** @class */ (function (_super) {
    __extends(ArrayConf, _super);
    function ArrayConf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayConf = __decorate([
        mota_1.model,
        mota_1.binding
    ], ArrayConf);
    return ArrayConf;
}(BasicConf_1.BasicConf));
exports.ArrayConf = ArrayConf;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
__webpack_require__(25);
var uuid = 0;
function Input(props) {
    var label = props.label, _a = props.id, id = _a === void 0 ? "input-" + uuid++ : _a, others = __rest(props, ["label", "id"]);
    return (React.createElement("div", { className: "control input" },
        React.createElement("label", { htmlFor: id }, label),
        React.createElement("input", __assign({ id: id }, others))));
}
exports.Input = Input;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Type_1 = __webpack_require__(1);
__webpack_require__(27);
function renderTypeOptions(types) {
    return Object.keys(types).map(function (name) { return (React.createElement("option", { key: name, value: name }, name)); });
}
var uuid = 0;
function TypePicker(props) {
    var onChange = props.onChange, value = props.value, _a = props.id, id = _a === void 0 ? "select-" + uuid++ : _a, others = __rest(props, ["onChange", "value", "id"]);
    return (React.createElement("div", { className: "control select" },
        React.createElement("label", { htmlFor: id, className: "fa fa-ellipsis-v" }),
        React.createElement("select", __assign({ id: id, value: value, onChange: onChange }, others), renderTypeOptions(Type_1.Type))));
}
exports.TypePicker = TypePicker;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var codemirror_react_1 = __webpack_require__(9);
__webpack_require__(29);
function YamlEditor(props) {
    var label = props.label, _a = props.alert, alert = _a === void 0 ? "Writing in Yaml" : _a, value = props.value, onChange = props.onChange, others = __rest(props, ["label", "alert", "value", "onChange"]);
    return (React.createElement("div", { className: "control yaml-editor" },
        React.createElement("label", null,
            label,
            React.createElement("span", { className: "alert" }, alert)),
        React.createElement(codemirror_react_1.default, __assign({ value: value, onChange: onChange, mode: "yaml", theme: "elegant", tabSize: 2, lineNumbers: true }, others))));
}
exports.YamlEditor = YamlEditor;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var codemirror_react_1 = __webpack_require__(9);
var mota_1 = __webpack_require__(2);
var Editor_1 = __webpack_require__(3);
var DockPanel = __webpack_require__(6);
__webpack_require__(32);
var SrcViewer = /** @class */ (function (_super) {
    __extends(SrcViewer, _super);
    function SrcViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SrcViewer.prototype.render = function () {
        var source = this.model.source;
        return (React.createElement(DockPanel, { className: "source" },
            React.createElement(DockPanel, { className: "topbar", dock: "top" },
                React.createElement("span", { className: "caption" }, "SOURCE")),
            React.createElement(DockPanel, { dock: "fill" },
                React.createElement(codemirror_react_1.default, { value: source, mode: "javascript", theme: "elegant", tabSize: 2, readOnly: true, lineNumbers: true }))));
    };
    SrcViewer = __decorate([
        mota_1.model(Editor_1.EditorModel),
        mota_1.binding
    ], SrcViewer);
    return SrcViewer;
}(React.Component));
exports.SrcViewer = SrcViewer;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var mota_1 = __webpack_require__(2);
var Editor_1 = __webpack_require__(3);
var Mode_1 = __webpack_require__(5);
__webpack_require__(34);
var items = [
    {
        icon: "edit",
        mode: Mode_1.Mode.design
    },
    {
        icon: "code",
        mode: Mode_1.Mode.source
    }
];
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.prototype.renderItems = function () {
        var _a = this.model, setMode = _a.setMode, mode = _a.mode;
        return items.map(function (item) {
            var active = item.mode === mode ? "active" : "";
            return (React.createElement("i", { key: item.mode, className: "fa fa-" + item.icon + " " + active, onClick: function () { return setMode(item.mode); } }));
        });
    };
    Toolbar.prototype.render = function () {
        return React.createElement("div", null, this.renderItems());
    };
    Toolbar = __decorate([
        mota_1.model(Editor_1.EditorModel),
        mota_1.binding
    ], Toolbar);
    return Toolbar;
}(React.Component));
exports.Toolbar = Toolbar;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map