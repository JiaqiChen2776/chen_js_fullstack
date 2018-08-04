import { setAttribute } from './dom.js';
import Component from '../react/component.js';

/**
 * 将虚拟DOM 变真实DOM
 * @param {*} vnode 
 * @return 返回DOM
 */
 function _render(vnode) {
  // 1. 递归：将节点转成dom，子节点递归，出口就是文本节点
  // 2. 节点类型 三种：
  //     文本节点：return createTextNode()
  //     标签节点：createElement()  setAttribute() children设置（递归 _render() 方法）
  //     Component: render(return jsx)
  // return document.createTextNode('render');

  if (vnode === undefined || vnode === null || typeof vnode === 'boolean')
    vnode = '';

  if (typeof vnode === 'number') {
    console.log(vnode);
    vnode = String(vnode);
  }

  // 文本节点
  if (typeof vnode === 'string') {
    let textNode = document.createTextNode(vnode);
    return textNode;
  }
  // Component -->  <Counter/> 不是正常标签，vnode.tag = function Counter() {}  -->  Counter类的一个实例
  if (typeof vnode.tag === 'function') {
    // console.log(vnode);
    // 1、createComponent() 返回一个实例化后的组件
    // 2、setComponentProps()  设置了 props
    // 3、renderComponent()  渲染组件
    const component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }

  // 标签节点
  const dom = document.createElement(vnode.tag);
  // 是否有属性
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      // 封装 setAttribute()
      setAttribute(dom, key, value);
    })
  }
  // 递归子节点
  if (vnode.children) {
    vnode.children.forEach(child => render(child, dom));
  }
  return dom;
}

function createComponent(component, props) {
  let inst;
  // 判断是否是函数，并且其中是否有 render 方法
  if (component.prototype && component.prototype.render) {
    inst = new component(props);
  } else {
    // new 一个基础类 Component
    inst = new Component(props);
    inst.constructor = component;
    inst.render = function() {
      return this.constructor(props);
    }
  }
  return inst;
}

function setComponentProps(component, props) {
  component.props = props;
  renderComponent(component);
}

// 将 component 里的 jsx 转为DOM，它还会在 setState 时调用
export function renderComponent(component) {
  let base;   // jsx 对应的 DOM
  // renderer 就是获取的 jsx
  const renderer = component.render();
  // 返回真实的 DOM
  base = _render(renderer);
  // 将 DOM节点 存储在对象中
  if (component.base && component.base.parentNode) {
    // 非第一次渲染组件
    // 替换原来的 dom 节点
    // 找到老节点的父节点，将其替换
    component.base.parentNode.replaceChild(base, component.base);
  }
  component.base = base;
  base._component = component;
}

export function render(vnode, container) {
  // console.log(vnode, container);
  return container.appendChild(_render(vnode));
}
