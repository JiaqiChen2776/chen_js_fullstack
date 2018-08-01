import { setAttribute } from './dom.js';

function _render (vnode) {
  // console.log(vnode);
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return textNode
  }
  // 当前节点为自定义组件的情况
  if (typeof vnode.tag === 'function') {
    // 在 jsx 里，<Counter/>就是一个标签
    // 普通标签就会来到 _render，而 Counter 是一个 function，返回一个 jsx
    // 实例化 Component ，生命周期， render 方法
    // console.log(vnode);
    const component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }

  const dom = document.createElement(vnode.tag);  

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      // if (key === 'className') key = 'class';
      // dom.setAttribute(key, vnode.attrs[key]);
      const value = vnode.attrs[key];
      // 不是简单的 setAttribute ,而是 onClick className {obj}
      // 模块化封装 setAttribute 方法
      setAttribute(dom, key, value);
    });
  }
  vnode.children.forEach(child =>  render(child, dom));
  return dom;
}

function createComponent(component, props) {
  // console.log(component, props);
  let inst;
  // component 是否有 render() 方法
  if (component.prototype && component.prototype.render) {
    inst = new component(props);
  }
  return inst;
}

function setComponentProps(component, props) {
  renderComponent(component);
}

export function renderComponent(component) {
  let base;
  // 调用组件的 render() 方法
  const renderer = component.render();
  base = _render(renderer); // 复用 _render() 方法
  component.base = base;
}


export function render (vnode, container) {
  return container.appendChild(_render(vnode))
}
