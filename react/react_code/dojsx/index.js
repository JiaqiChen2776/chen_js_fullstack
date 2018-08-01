// 原生实现 React： jsx 

// 1、创建 React 命名空间
const React = {
  createElement
};
// 2、创建节点（标签名、属性、子节点）
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

// 3.1、创建 ReactDOM 命名空间
const ReactDOM = {
  render: (vnode, container) => {
    return render(vnode, container);
  }
};

function render(vnode, container) {
  console.log(vnode);
  // 递归出口：当前节点为文本节点的情况
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode, container);
  }
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      if (key === 'className')  key = 'class';   // 真实的DOM中类的属性名为 class
      dom.setAttribute(key, vnode.attrs[key]);
    });
  }
  const dom = document.createElement(vnode.tag);
  // 递归（若有子节点，则递归，当前节点作为子节点的要挂载的容器）
  vnode.children.forEach(child => render(child, dom));
  return container.appendChild(dom);
}

const element = (
  <div>
    hello<span>world</span>
  </div>
);
// console.log(element);

// 3、将虚拟DOM 变成真实DOM
ReactDOM.render(
  <h1>Hello, World!</h1>,
  document.getElementById('root')
)

