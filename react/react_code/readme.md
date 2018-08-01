1. 虚拟DOM ？ VNode Virtual DOM
mvvm 封装了 dom 层
dom 太消耗内存
vnode + diff算法 来解决内存消耗问题

jsx 语法 
用 js 对象描述 html 结构（标签的属性、子标签等）
vdom:
使用虚拟DOM替代真实的DOM 
将上一版本 与 新的版本 进行 diff 运算，只更新修改部分

安装：
yarn add babel-cli babel-core babel-preset-env babel-preset-react

配置：
.babelrc


JSX 背后隐含着 VNode 的真相
React.createElement(
  "h1"  第一个参数， ele = document.createElement()
  attributes 第二个参数，ele.setAttribute(key, val)
  children 第三个参数， appendChild()
    文本节点  textnode
    node   递归一下
)

虚拟DOM 描述html结构（页面中的任何标签都会对应一个 虚拟节点对象）
示例：<h1 className="title">标题<span>副标题</span></h1>，虚拟DOM对象如下：
VNode = {
  tag: "h1",
  attrs: {
    class: "title"
  },
  children: [
    '标题',
    递归 VNode...(出口为 textnode, 可实现 DOM 树的嵌套)
  ]
}



## 原生实现 React：

1. 安装：yarn add babel-cli babel-core babel-preset-env babel-plugin-transform-react-jsx

babel-plugin-transform-react-jsx  插件
自动将 jsx 中的节点变成虚拟DOM（自动寻找 React.createElement，并执行  ）

2. 配置：
.babelrc 文件
  {
    "preset": ["env"],
    "plugins": [
      ["transform-react-jsx", {
        "pragma": "React.createElement"
      }]
    ]
  }

- 示例：<div>hello<span>world</span></div>
    编译：babel index.js -o a.js
    运行：node a.js  // 将虚拟DOM抽象为对象
    结果：
      { tag: 'div',
        attrs: null,
        children: [ 'hello', { tag: 'span', attrs: null, children: [Array] } ] }

