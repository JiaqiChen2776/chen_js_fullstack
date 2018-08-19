export const UPDATA_VALUE = 'UPDATE_VALUE';

export function updateValue(value) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: UPDATA_VALUE,
        payload: value
      })
    }, 1000)
  }
}