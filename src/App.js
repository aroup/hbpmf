import React, { Component } from 'react';
import banner from './banner.jpg';
import './App.css';
import YoutubeContainer from './YoutubeContainer';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to Backpack Music!</h1>
        </header>
        <div className="youtube-container">
          <YoutubeContainer />
        </div>
      </div>
    );
  }
}

export default App;
