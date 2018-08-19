import { createStore, applyMiddleware, combineReducers } from 'redux';
// 1. combineReducers --> 将很多的状态改变集合到一起
import thunk from 'redux-thunk';
// 支持异步数据流， action -> reducer 改变只支持同步操作
// axios
import { reducer } from './reducer';

const reducers = {
  global: reducer
};
// 2. applyMiddleware 中间件：负责提供异步功能，等待状态改变，再同步到 reducer 上
export const store = createStore(combineReducers(reducers), applyMiddleware(...[thunk]));

// registerReducer 函数 --> 动态添加一个 reducer，replaceReducer 替换
export function registerReducer(key, reducer) {
  reducers[key] = reducer;
  store.replaceReducer(combineReducers(reducers));
}