import * as ActionTypes from './actionTypes';

// 进入播放页
export function showPlayer(showStatus) {
  return {
    type: ActionTypes.SHOW_PLAYER,
    showStatus
  }
}
// 当前播放歌曲
export function changeSong (song) {
  return {
    type: ActionTypes.CHANGE_SONG,
    song
  }
}
// 播放列表
export function setSongs(songs) {
  return {
    type: ActionTypes.SET_SONGS,
    songs
  }
}
// 删除播放列表中的某一首歌曲
export function removeSong(id) {
  return {
    type: ActionTypes.REMOVE_SONG_FROM_LIST,
    id
  }
}