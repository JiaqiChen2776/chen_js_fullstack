'use strict';

// 原生实现 React： jsx 

// 1、创建 React 命名空间
var React = {
  createElement: createElement
};
// 2、创建节点（标签名、属性、子节点）
function createElement(tag, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children
  };
}

// 3.1、创建 ReactDOM 命名空间
var ReactDOM = {
  render: function render(vnode, container) {
    return _render(vnode, container);
  }
};

function _render(vnode, container) {
  console.log(vnode);
  // 递归出口：当前节点为文本节点的情况
  if (typeof vnode === 'string') {
    var textNode = document.createTextNode(vnode);
    return container.appendChild(textNode, container);
  }
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(function (key) {
      if (key === 'className') key = 'class'; // 真实的DOM中类的属性名为 class
      dom.setAttribute(key, vnode.attrs[key]);
    });
  }
  var dom = document.createElement(vnode.tag);
  // 递归（若有子节点，则递归，当前节点作为子节点的要挂载的容器）
  vnode.children.forEach(function (child) {
    return _render(child, dom);
  });
  return container.appendChild(dom);
}

var element = React.createElement(
  'div',
  null,
  'hello',
  React.createElement(
    'span',
    null,
    'world'
  )
);
// console.log(element);

// 3、将虚拟DOM 变成真实DOM
ReactDOM.render(React.createElement(
  'h1',
  null,
  'Hello, World!'
), document.getElementById('root'));
