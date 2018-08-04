import renderComponent from '../react-dom/render'
class Component {
  constructor(props = {}) {
    this.isReactComponent = true;
    this.state = {};
    this.props = props;
  }
  setState(stateChange) {
    // 响应式编程
    // 将新对象的内容更新到旧的 state 里
    Object.assign(this.state, stateChange);
    // 更新DOM
    renderComponent(this);
  }
}

export default Component;