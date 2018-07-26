import { combineReducers } from 'redux';
// combineReducers 函数，可接受一个参数，返回新的状态
import * as ActionTypes from './actionTypes';
const initialState = {
  song: {},  // 当前播放歌曲
  songs: [], // 播放列表
  showStatus: false
}

// 关于 song 的提供与修改，只支持song一种操作
function song(song = initialState.song, action){
  switch(action.type) {
    // 接收状态，类型检测，返回新状态
    case ActionTypes.CHANGE_SONG:
      return action.aong
    default:
      return song
  }
}
// 纯函数:同一个输入，同一个结果
// 一个函数不能将所有情况覆盖，因此需要多个 reducer 并 combineReducers()
function songs(songs = initialState.songs, action) {
  switch (action.type) {
    case ActionTypes.SET_SONGS:
      return action.songs;
    case ActionTypes.REMOVE_SONG_FROM_LIST:
      return songs.filter(song => song.id !== action.id);
    default:
      return songs;
  }
}

function showStatus(showStatus = initialState.showStatus, action) {
  switch (action.type) {
    case ActionTypes.SHOW_PLAYER:
      return action.showStatus;
    default:
      return showStatus;
  }
}

const reducer = combineReducers({
  // 合并多个 reducer
  song,
  songs,
  showStatus
})
export default reducer;