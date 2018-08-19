import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

// 纯函数组件，比 Component 更小，可提升性能
export default class ReduxWrapper extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div>{this.props.children}</div>
      </Provider>
    )
  }
}