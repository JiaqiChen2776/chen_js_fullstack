import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class LikeButton extends Component {
    state = {
        liked: false
    }
    handleClick() {
        this.setState({
            liked: !this.state.liked
        })
    }
    render() {
        const text = this.state.liked?'like':'don\'t like';
        return (
            <p onClick={() => this.handleClick()}>
                You {text} this.click to toggle
            </p>
        )
    }
}

class App extends Component {
    handleClick() {
        // this.refs.myTextInput.focus()
    }
  render() {
      const data = 'like'
    return (
      <div className="App">
      <LikeButton/>
        <input type="text" ref="myTextInput"/>
        <input type="button" value="Focus the text input" onClick={this.handleClick.bind(this)}/>
      </div>
    );
  }
}

export default App;
