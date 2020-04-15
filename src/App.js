import React from 'react';
import './App.css';
import Votd from './components/Votd';
import Clock from './components/Clock';
import Greeting from './components/Greeting';
import { Fade } from '@material-ui/core';

function App() {
  return (
    <Fade in={true} timeout={1000}>
    <div className="App">
      <div className="App-main">
        <div className="Time-container">
            <Clock className="Time-component"/>
            <Greeting className="Time-component"/>
        </div>
        <div className="Votd">
            <Votd />
        </div>
      </div>
      <div className="Credits">
          Credits:
          <a href="https://youversion.com/" target="_blank" rel="noopener noreferrer">YouVersion</a>,
          <a href="https://unsplash.com/collections/162213/long-exposure" target="_blank" rel="noopener noreferrer"> Unsplash</a>
      </div>
    </div>
    </Fade>
  );
}

export default App;
