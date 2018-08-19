import { UPDATE_VALUE } from './action';

export function reducer(state, action) {
  // reducer --> 提供新版本 state
  state = {...state} || {value: 1};
  switch(action.type) {
    case UPDATE_VALUE:
      state.value = action.payload
      break;
    default:
      break;
  }
  return state;
}