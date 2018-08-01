// jsx 语法
const title = <h1 className="title">hello, world</h1>

// 编译后在 react 中的源码
// 一个节点就是一个虚拟DOM对象，在 setState 后，转换成真实的DOM节点
"use strict";
var title = React.createElement(  // 一个虚拟节点的对象
  "h1",
  { className: "title" }, // 属性
  "hello, world"  // 子节点 text
);
// 注：若属性改变，则只更新属性