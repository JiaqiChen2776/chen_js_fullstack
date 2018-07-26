import React, { Component } from 'react';
import MiniPlayer from '../components/play/MiniPlayer';
import { connect } from 'react-redux';
import { changeSong} from '../redux/actions';

const mapStateToProps = (state) => ({
  currentSong: state.song,
  playSongs: state.songs
})

const mapDispatchToProps = (dispatch) => ({
  changeCurrentSong: (song) => {
    dispatch(changeSong(song));
  }
})
// mapStateToProps 将 state 映射过来
export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);