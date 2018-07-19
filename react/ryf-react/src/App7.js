import React, { Component } from 'react';
import './App.css';

class Hello extends Component {
    state = {
        opacity: 1.0
    }
    render() {
        return (
            <div style={{opacity:this.state.opacity}}>
                Hello {this.props.name}
            </div>
        )
    }
    componentDidMount() {
        this.timer = setInterval(function() {
            var opacity = this.state.opacity;
            opacity -= 0.05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity
            });
        }.bind(this), 100);
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hello name="world"/>
      </div>
    );
  }
}

export default App;
