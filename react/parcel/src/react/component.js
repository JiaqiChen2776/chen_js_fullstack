class Component {
  // 给 props 赋一个默认值
  constructor(props = {}) {
    this.isReactComponent = true;
    this.state = {};
    this.props = props;
  }

  setState(stateChange) {
    // this.state 旧状态，stateChange 新状态
    Object.assign(this.state, stateChange);  // 合并对象
  }
}

export default Component;