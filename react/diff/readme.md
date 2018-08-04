# React 源码分析

流程：jsx (react-jsx-plugin) -> vnode (createElement) -> DOM (render)
vnode：减少DOM渲染，提升性能

## 创建 React 命名空间

- 提供 createElement 方法
    返回一个虚拟DOM对象
function createElement(tag, attrs, ...children) {
  return {
    tag,  // 标签
    attrs,  // 属性
    children, // 子元素
    key   // 唯一标识
  }
}


## 创建 ReactDOM 命名空间

- 提供 render 方法

function render(vnode, container) {}

将 Component 虚拟化DOM：
Component （render 的第三种方式，react-jsx）
vnode.tag function Counter -> 标签化组件
-> Counter(extends) -> Component类 -> render(jsx)方法 -> ReactDOM.render()


响应式 setState() ,为了达到DOM的更新，将整个DOM片段都替换掉了
- 新生成整个的组件DOM树，重新挂载（找到老DOM的parentNode进行replace） 100 行代码
- 只将 setState 关联的那一小段 DOM，在原来的DOM的基础上做一下修改，将修改反映到DOM上，1 行代码，性能大大提升

n:1 --> 替换之后，html树需要“重绘”，有一个DOM树的生成过程，非常消耗性能，DOM开销是一般计算开销的100——1000倍
“重绘”：replaceChild() ，一个单页应用里组件、数据、交互、状态的改变太多了，一旦改变就进行重绘，非常消耗性能
“重排”：消耗性能


React DOM diff 算法：
需求是：减少DOM操作
setState 对应 DOM 部分
解决：
setState 返回一个新的 vnode --> 将新的内存（虚拟）DOM 与旧的 DOM 进行对比

新旧 DOM 都是一棵树，只要采用算法，就可以比较出差异点，在相差的地方，进行真实DOM的操作
算法思想：将两颗DOM树进行逐层比较（比较标签、属性、子节点等），比较后只更新不同部分